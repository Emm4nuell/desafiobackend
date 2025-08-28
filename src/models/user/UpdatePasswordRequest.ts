import { Request } from "express";
import z from "zod";

class UpdatePasswordRequest {
  private readonly _password: string;
  private readonly _newpassword: string;

  constructor(password: string, newpassword: string) {
    this._password = password;
    this._newpassword = newpassword;
  }

  public get password() {
    return this._password;
  }

  public get newpassword() {
    return this._newpassword;
  }

  static fromRequest(req: Request): UpdatePasswordRequest {
    const validation = z.object({
      password: z.string().nonempty("Campo senha antiga é obrigatório."),
      newpassword: z.string().nonempty("Campo senha é obrigatório."),
    });

    const response = validation.parse(req.body);

    return new UpdatePasswordRequest(response.password, response.newpassword);
  }
}
export default UpdatePasswordRequest;
