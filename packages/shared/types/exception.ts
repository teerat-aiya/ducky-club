
export class DirectusException extends Error {
  reason: string;
  code: string;

  constructor(message: string, reason: string, code: string) {
    super(message);
    this.reason = reason;
    this.code = code;
  }
}