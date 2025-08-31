import { FieldError } from "./FieldError";

export default class GlobalException extends FieldError {
  static nullPointerException(message: string) {
    return new FieldError(500, "NullPointerException", message);
  }

  static internalServerError(message: string) {
    return new FieldError(500, "InternalServerError", message);
  }

  static badRequest(message: string) {
    return new FieldError(400, "BadRequest", message);
  }

  static unauthorized(message: string) {
    return new FieldError(401, "Unauthorized", message);
  }

  static forbidden(message: string) {
    return new FieldError(403, "Forbidden", message);
  }

  static notFound(message: string) {
    return new FieldError(404, "NotFound", message);
  }
  static nullValue(message: string) {
    return new FieldError(400, "Nullvalue", message);
  }

  static conflict(message: string) {
    return new FieldError(409, "Conflict", message);
  }

  static passwordMismatch(message: string) {
    return new FieldError(400, "PasswordMismatch", message);
  }
}
