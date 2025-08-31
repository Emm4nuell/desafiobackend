import { Request } from "express";
import z from "zod";

export default class AuthUser {
  private readonly email: string;
  private readonly password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  static fromRequest(req: Request) {
    const validation = z.object({
      email: z
        .email("Campo E-mail é obrigatório.")
        .nonempty("Campo E-mail não pode ser nulo."),
      password: z.string().nonempty("Campo senha é obrigatório."),
    });
    const request = validation.parse(req.body);
    return new AuthUser(request.email, request.password);
  }
}
