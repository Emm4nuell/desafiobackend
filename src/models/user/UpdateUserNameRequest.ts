import { Request } from "express";
import z from "zod";

class UpdateUserNameRequest {
  private readonly _name: string;
  private readonly _email: string;

  public get name() {
    return this._name;
  }

  public get email() {
    return this._email;
  }

  constructor(name: string, email: string) {
    this._name = name;
    this._email = email;
  }

  static fromRequest(req: Request) {
    const validation = z.object({
      name: z.string().nonempty("Campo nome é obrigatório."),
      email: z
        .email("Deve ser um email válido")
        .nonempty("Campo email é obrigatório"),
    });

    const request = validation.parse(req.body);
    return new UpdateUserNameRequest(request.name, request.email);
  }
}

export default UpdateUserNameRequest;
