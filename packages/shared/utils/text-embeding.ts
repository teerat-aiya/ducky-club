import { OpenSearch, OpenSearchConfig } from "@repo/shared/aws/opensearch";

export interface Metadata {
  [key: string]: any;
}

export class TextEmbedding<T extends Metadata = Metadata> {
  private readonly openSearch: OpenSearch;
  private readonly index: string;
  private readonly dimension: number;

  constructor(
    openSearchConfig: OpenSearchConfig,
    index: string,
    dimension: number = 512
  ) {
    this.openSearch = new OpenSearch(openSearchConfig);
    this.index = index;
    this.dimension = dimension;
  }

  async createIndex(): Promise<void> {
    try {
      await this.openSearch.createIndex({
        index: this.index,
        settings: {
          "index.knn": true,
        },
        mappings: {
          properties: {
            id: { type: "keyword" },
            text: { type: "text" },
            vector_field: {
              type: "knn_vector",
              dimension: this.dimension,
              method: {
                engine: "faiss",
                space_type: "l2",
                name: "hnsw",
                parameters: {
                  ef_construction: 512,
                  m: 16,
                },
              },
            },
            metadata: {
              type: "object",
            },
          },
        },
      });
      console.log(`Index ${this.index} created successfully.`);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("resource_already_exists_exception")
      ) {
        console.log(`Index ${this.index} already exists.`);
      } else {
        console.error(`Error creating index ${this.index}:`, error);
        throw error;
      }
    }
  }

  async addDocument(text: string, metadata?: T): Promise<ID> {
    const embedding = await getTextEmbedding(text);
    const document: EmbeddingDocument<T> = {
      id: crypto.randomUUID(),
      text,
      vector_field: embedding,
      metadata,
    };

    const res = await this.openSearch.index<EmbeddingDocument<T>>(
      this.index,
      document,
      document.id
    );

    console.log(`Document added with id ${res._id}`);

    return document.id;
  }

  async search(
    query: string,
    options: SearchOptions = {}
  ): Promise<SearchResult<T>[]> {
    const { topK = 5, filters } = options;
    const queryEmbedding = await getTextEmbedding(query);

    const searchBody = {
      size: topK,
      _source: {
        exclude: ["vector_field"],
      },
      query: {
        bool: {
          must: [
            {
              knn: {
                vector_field: {
                  vector: queryEmbedding,
                  k: topK,
                },
              },
            },
          ],
          filter: filters ? this.buildFilters(filters) : [],
        },
      },
      collapse: {
        field: "metadata.intent_id.keyword",
        inner_hits: {
          name: "top_score_per_response",
          size: 1,
          sort: [{ _score: "desc" }],
        },
      },
    };

    console.log("searchBody", JSON.stringify(searchBody, null, 2));
    

    const searchResponse = await this.openSearch.search<EmbeddingDocument<T>>({
      index: this.index,
      body: searchBody,
    });

    // console.log("searchResponse", searchResponse.hits.hits.map((hit) => hit._score));

    return searchResponse.hits.hits.map((hit) => ({
      id: hit._source.id,
      text: hit._source.text,
      score: hit._score,
      metadata: hit._source.metadata,
    }));
  }

  private buildFilters(filters: Record<string, unknown>): object[] {
    return Object.entries(filters).map(([key, value]) => ({
      term: { [`metadata.${key}.keyword`]: value },
    }));
  }

  async deleteDocument(id: ID): Promise<void> {
    await this.openSearch.delete(this.index, id);
  }

  async getDocumentByMetadata(
    metadata: Record<string, unknown>
  ): Promise<EmbeddingDocument<T> | null> {
    const filters = Object.entries(metadata).map(([key, value]) => ({
      term: { [`metadata.${key}.keyword`]: value },
    }));

    const searchBody = {
      size: 1,
      query: {
        bool: {
          filter: filters,
        },
      },
    };

    const searchResponse = await this.openSearch.search<EmbeddingDocument<T>>({
      index: this.index,
      body: searchBody,
    });

    return searchResponse.hits.hits[0]?._source ?? null;
  }

  async updateDocument(
    id: ID,
    text: string,
    metadata?: Partial<T>
  ): Promise<void> {
    const embedding = await getTextEmbedding(text);
    const document: Partial<EmbeddingDocument<T>> = {
      text,
      vector_field: embedding,
      metadata: metadata as T, // Type assertion needed due to partial update
    };

    await this.openSearch.update<EmbeddingDocument<T>>(
      this.index,
      id,
      document
    );
  }

  async deleteDocumentByText(
    text: string,
    metadata: Record<string, unknown>
  ): Promise<{ deleted: string[] }> {
    const filters = Object.entries(metadata).map(([key, value]) => ({
      term: { [`metadata.${key}.keyword`]: value },
    }));

    const searchBody = {
      size: 1000,
      // _source: ["id", "text", "metadata"],
      query: {
        bool: {
          must: [
            {
              match: {
                text,
              },
            },
          ],
          filter: filters,
        },
      },
    };

    const searchResponse = await this.openSearch.search<EmbeddingDocument<T>>({
      index: this.index,
      body: searchBody,
    });

    const ids = searchResponse.hits.hits.map((hit) => hit._source.id);
    await Promise.all(ids.map((id) => this.openSearch.delete(this.index, id)));
    console.log(
      `Deleted ${ids.length} documents with text "${text}" and metadata:`,
      metadata
    );

    return { deleted: ids };
  }

  async deleteDocumentByMetadata(
    metadata: Record<string, unknown>
  ): Promise<{ deleted: string[] }> {
    const filters = Object.entries(metadata).map(([key, value]) => ({
      term: { [`metadata.${key}.keyword`]: value },
    }));

    const searchBody = {
      size: 1000,
      // _source: ["id", "text", "metadata"],
      query: {
        bool: {
          filter: filters,
        },
      },
    };

    console.log("searchBody", JSON.stringify(searchBody, null, 2));

    const searchResponse = await this.openSearch.search<EmbeddingDocument<T>>({
      index: this.index,
      body: searchBody,
    });

    const ids = searchResponse.hits.hits.map((hit) => hit._source.id);

    console.log("ids", ids);

    await Promise.all(ids.map((id) => this.openSearch.delete(this.index, id)));
    console.log(`Deleted ${ids.length} documents with metadata:`, metadata);

    return { deleted: ids };
  }

  async clearDocuments({
    filters,
  }: {
    filters: Record<string, unknown>;
  }): Promise<void> {
    await this.openSearch
      .deleteByQuery(this.index, {
        query: {
          bool: {
            must: this.buildFilters(filters),
          },
        },
      })
      .then((res) => {
        console.log(`Deleted ${res.deleted} documents`);
      });
  }

  // update disable document by metadata
  async disableDocumentByMetadata(
    metadata: Record<string, unknown>
  ): Promise<{ updated: number }> {
    const filters = Object.entries(metadata).map(([key, value]) => ({
      term: { [`metadata.${key}.keyword`]: value },
    }));

    const updateResponse = await this.openSearch.updateByQuery<
      EmbeddingDocument<T>
    >({
      index: this.index,
      body: {
        script: {
          source: "ctx._source.metadata.status = 'draft'",
          lang: "painless",
        },
        query: {
          bool: {
            filter: filters,
          },
        },
      },
    });

    return { updated: updateResponse.updated };
  }

  // update enable document by metadata
  async enableDocumentByMetadata(
    metadata: Record<string, unknown>
  ): Promise<{ updated: number }> {
    const filters = Object.entries(metadata).map(([key, value]) => ({
      term: { [`metadata.${key}.keyword`]: value },
    }));

    const updateResponse = await this.openSearch.updateByQuery<
      EmbeddingDocument<T>
    >({
      index: this.index,
      body: {
        script: {
          source: "ctx._source.metadata.status = 'published'",
          lang: "painless",
        },
        query: {
          bool: {
            filter: filters,
          },
        },
      },
    });

    return { updated: updateResponse.updated };
  }
}

type ID = string;

interface EmbeddingDocument<T extends Metadata = Metadata> {
  id: ID;
  text: string;
  vector_field: number[];
  metadata?: T;
}

interface SearchResult<T extends Metadata = Metadata> {
  id: ID;
  text: string;
  score: number;
  metadata?: T;
}

interface SearchOptions {
  topK?: number;
  filters?: Record<string, unknown>;
}

// Custom embedding function
export async function getTextEmbedding(text: string): Promise<number[]> {
  const response = await fetch("https://text.aiya.ai/embed", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error(`Embedding request failed with status ${response.status}`);
  }

  const result = (await response.json()) as {
    text: string;
    usage_time_ms: number;
    embedding: number[][];
  };

  return result.embedding[0];
}
