import { NextFunction, Request, Response } from "express";
import GlobalException from "../exceptions/GlobalException";
import TokenUtil from "../utils/TokenUtil";
import { JwtPayload } from "jsonwebtoken";
import UserDao from "../dao/UserDao";

export async function securityFilter(
  req: Request,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  res: Response,
  next: NextFunction
) {
  const tokenutil = new TokenUtil();
  const userdao = new UserDao();
  const header = req.headers["authorization"];

  if (!header) {
    throw GlobalException.unauthorized("Autenticação inválida.");
  }

  const token = header.split(" ")[1];
  const payload = tokenutil.verifyToken(token) as JwtPayload;

  const verify = await userdao.existsByEmail(payload.email);
  if (!verify) {
    throw GlobalException.unauthorized("Não autorizado.");
  }
  next();
}
