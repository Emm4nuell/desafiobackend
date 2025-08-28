import { Request } from "express";
import z from "zod";

class CreateUserRequest {
  private readonly _name: string;
  private readonly _email: string;
  private readonly _password: string;

  constructor(name: string, email: string, password: string) {
    this._name = name;
    this._email = email;
    this._password = password;
  }

  public get name() {
    return this._name;
  }

  public get email() {
    return this._email;
  }

  public get password() {
    return this._password;
  }

  static fromRequest(req: Request): CreateUserRequest {
    const validation = z.object({
      name: z.string().nonempty("Campo nome é obrigatório."),
      email: z.email("Deve ser um email válido."),
      password: z.string().nonempty("Campo senha é obrigatório."),
    });

    const request = validation.parse(req.body);
    return new CreateUserRequest(request.name, request.email, request.password);
  }
}

export default CreateUserRequest;
