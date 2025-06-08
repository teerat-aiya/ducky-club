import { Logger } from "@/utils";
// DirectusError.ts
export class DirectusError extends Error {
  status?: number;
  errors?: Array<{ message: string; extensions?: Record<string, unknown> }>;

  constructor(
    message: string,
    status?: number,
    errors?: Array<{ message: string; extensions?: Record<string, unknown> }>
  ) {
    super(message);
    this.name = "DirectusError";
    this.status = status;
    this.errors = errors;

    // This line is necessary for proper prototype chain inheritance in TypeScript
    Object.setPrototypeOf(this, DirectusError.prototype);
  }

  static fromDirectusResponse(error: unknown): DirectusError {
    if (typeof error === "object" && error !== null) {
      const errorObj = error as any;
      if (errorObj.errors && Array.isArray(errorObj.errors)) {
        return new DirectusError(
          errorObj.errors[0]?.message || "Unknown Directus Error",
          errorObj.response?.status,
          errorObj.errors
        );
      } else if (errorObj.response) {
        return new DirectusError(
          errorObj.response.statusText || "Unknown Directus Error",
          errorObj.response.status
        );
      }
    }
    return new DirectusError(
      error instanceof Error ? error.message : "Unknown Error"
    );
  }
}

export function handleDirectusError(error: unknown, logger: Logger): void {
  if (error instanceof DirectusError) {
    logger.error(`Directus Error (${error.status}):`, error.message);
    if (error.errors) {
      error.errors.forEach((err, index) => {
        logger.error(`Error ${index + 1}:`, err.message);
        if (err.extensions) {
          logger.debug("Extensions:", err.extensions);
        }
      });
    }
  } else if (error instanceof Error) {
    logger.error("Unexpected Error:", error.message);
    if (error.stack) {
      logger.debug("Stack:", error.stack);
    }
  } else {
    logger.error("Unknown Error:", error);
  }
}
