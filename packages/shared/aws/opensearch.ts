// Custom error classes
class OpenSearchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OpenSearchError";
    // This is necessary for proper instanceof checks after transpilation
    Object.setPrototypeOf(this, OpenSearchError.prototype);
  }
}

class OpenSearchConfigError extends OpenSearchError {
  constructor(message: string) {
    super(message);
    this.name = "OpenSearchConfigError";
    Object.setPrototypeOf(this, OpenSearchConfigError.prototype);
  }
}

class OpenSearchNetworkError extends OpenSearchError {
  constructor(message: string) {
    super(message);
    this.name = "OpenSearchNetworkError";
    Object.setPrototypeOf(this, OpenSearchNetworkError.prototype);
  }
}

class OpenSearchTimeoutError extends OpenSearchError {
  constructor(message: string) {
    super(message);
    this.name = "OpenSearchTimeoutError";
    Object.setPrototypeOf(this, OpenSearchTimeoutError.prototype);
  }
}

class OpenSearchResponseError extends OpenSearchError {
  constructor(
    public readonly statusCode: number,
    public readonly body: string
  ) {
    super(`OpenSearch responded with status ${statusCode}`);
    this.name = "OpenSearchResponseError";
    Object.setPrototypeOf(this, OpenSearchResponseError.prototype);
  }
}

export interface OpenSearchConfig {
  endpoint: string;
  username: string;
  password: string;
  defaultIndex?: string;
  maxRetries?: number;
  requestTimeout?: number;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface SearchParams<TQuery> {
  index?: string;
  body: {
    query: TQuery;
    size?: number;
    from?: number;
    sort?: Array<{
      [key: string]: {
        order: "asc" | "desc";
      };
    }>;
  };
}

interface SearchResponse<T> {
  hits: {
    total: {
      value: number;
      relation: "eq" | "gte";
    };
    hits: Array<{
      _index: string;
      _id: string;
      _score: number;
      _source: T;
    }>;
  };
}

interface UpdateByQueryParams {
  index?: string;
  body: {
    script: any;
    query: any;
  };
}

interface IndexSettings {
  [key: string]: any;
  number_of_shards?: number;
  number_of_replicas?: number;
  // Add other settings as needed
}

interface IndexMappings {
  properties: {
    [key: string]: {
      type: string;
      // Add other mapping properties as needed
      dimension?: number;
      [key: string]: any;
    };
  };
}

interface CreateIndexParams {
  index: string;
  settings?: IndexSettings;
  mappings?: IndexMappings;
}

export class OpenSearch {
  private readonly config: Required<OpenSearchConfig>;

  constructor(config: OpenSearchConfig) {
    this.config = {
      ...config,
      defaultIndex: config.defaultIndex ?? "default_index",
      maxRetries: config.maxRetries ?? 3,
      requestTimeout: config.requestTimeout ?? 30000,
    };

    this.validateConfig();
  }

  private validateConfig(): void {
    const { endpoint, username, password } = this.config;

    if (!endpoint) {
      throw new OpenSearchConfigError("OpenSearch endpoint is required");
    }

    if (!endpoint.startsWith("http://") && !endpoint.startsWith("https://")) {
      throw new OpenSearchConfigError(
        "OpenSearch endpoint must start with http:// or https://"
      );
    }

    if (!username || !password) {
      throw new OpenSearchConfigError(
        "OpenSearch username and password are required"
      );
    }
  }

  async request<T>(
    path: string,
    method: HttpMethod,
    body?: unknown
  ): Promise<T> {
    const url = `${this.config.endpoint}${path}`;
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${this.config.username}:${this.config.password}`)}`,
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      this.config.requestTimeout
    );

    let retries = 0;
    while (retries < this.config.maxRetries) {
      try {
        const response = await fetch(url, {
          method,
          headers,
          body: body ? JSON.stringify(body) : undefined,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorBody = await response.text();
          throw new OpenSearchResponseError(response.status, errorBody);
        }

        return (await response.json()) as T;
      } catch (error: unknown) {
        if (error instanceof OpenSearchResponseError) {
          throw error; // Rethrow OpenSearchResponseError
        }
        if (error instanceof Error && error.name === "AbortError") {
          throw new OpenSearchTimeoutError(
            `OpenSearch request timed out after ${this.config.requestTimeout}ms`
          );
        }

        retries++;
        if (retries >= this.config.maxRetries) {
          throw new OpenSearchNetworkError(
            `Failed to connect to OpenSearch after ${this.config.maxRetries} attempts: ${error instanceof Error ? error.message : String(error)}`
          );
        }

        // Exponential backoff
        await new Promise((resolve) => setTimeout(resolve, 2 ** retries * 100));
      }
    }

    throw new OpenSearchNetworkError("Max retries reached");
  }

  async search<T, TQuery = object>(
    params: SearchParams<TQuery>
  ): Promise<SearchResponse<T>> {
    const { index = this.config.defaultIndex, body } = params;
    const path = `/${index}/_search`;
    return this.request<SearchResponse<T>>(path, "POST", body);
  }

  async index<T>(
    index: string | undefined,
    document: T,
    id?: string
  ): Promise<{ _id: string }> {
    const path = `/${index || this.config.defaultIndex}/_doc${id ? `/${id}` : ""}?refresh=true`;
    return this.request<{ _id: string }>(path, id ? "PUT" : "POST", document);
  }

  async get<T>(
    index: string | undefined,
    id: string
  ): Promise<{ _source: T; _id: string }> {
    const path = `/${index || this.config.defaultIndex}/_doc/${id}`;
    return this.request<{ _source: T; _id: string }>(path, "GET");
  }

  async update<T>(
    index: string | undefined,
    id: string,
    doc: Partial<T>
  ): Promise<{ _id: string }> {
    const path = `/${index || this.config.defaultIndex}/_doc/${id}/_update?refresh=true`;
    return this.request<{ _id: string }>(path, "POST", { doc });
  }

  async delete(
    index: string | undefined,
    id: string
  ): Promise<{ _id: string }> {
    const path = `/${index || this.config.defaultIndex}/_doc/${id}?refresh=true`;
    return this.request<{ _id: string }>(path, "DELETE");
  }

  async createIndex(
    params: CreateIndexParams
  ): Promise<{ acknowledged: boolean; index: string }> {
    const { index, settings, mappings } = params;
    const path = `/${index}`;
    const body = {
      settings,
      mappings,
    };

    return this.request<{ acknowledged: boolean; index: string }>(
      path,
      "PUT",
      body
    );
  }

  async deleteByQuery<TQuery>(
    index: string | undefined,
    query: TQuery
  ): Promise<{ deleted: number }> {
    const path = `/${index || this.config.defaultIndex}/_delete_by_query`;

    console.log("path", path);
    console.log("query", JSON.stringify(query));

    return this.request<{ deleted: number }>(path, "POST", query);
  }

  // update by query
  async updateByQuery<TQuery>(
    params: UpdateByQueryParams
  ): Promise<{ updated: number }> {
    const { index, body } = params;
    const { query } = body;
    const path = `/${index || this.config.defaultIndex}/_update_by_query`;

    console.log("path", path);
    console.log("query", JSON.stringify(query));

    return this.request<{ updated: number }>(path, "POST", body);
  }
}
