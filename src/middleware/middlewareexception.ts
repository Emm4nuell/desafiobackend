import { Request, Response, NextFunction } from "express";
import { FieldError } from "../exceptions/FieldError";

export function errorHandler(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  if (err instanceof FieldError) {
    return res.status(err.status).json({
      status: err.status,
      error: err.error,
      message: err.message,
    });
  }

  console.error(err);
  return res.status(500).json({
    status: 500,
    error: "InternalServerError",
    message: "Ocorreu um erro inesperado",
  });
}
