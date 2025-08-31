export class FieldError extends Error {
  readonly status: number;
  readonly error: string;
  constructor(status: number, error: string, message: string) {
    super(message);
    this.status = status;
    this.error = error;
    Object.setPrototypeOf(this, FieldError.prototype);
  }
}
