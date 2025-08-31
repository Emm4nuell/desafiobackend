import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";
import UpdateUserNameRequest from "../models/user/UpdateUserNameRequest";
import CreateUserRequest from "../models/user/CreateUserRequest";
import UpdatePasswordRequest from "../models/user/UpdatePasswordRequest";

class UserController {
  private readonly userservice = new UserService();

  async createUser(req: Request, res: Response) {
    await this.userservice.create(CreateUserRequest.fromRequest(req));
    return res.sendStatus(201);
  }

  async getUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userservice.findById(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      console.log("Sistema acionado com sucesso!");
      const response = await this.userservice.updateUserName(
        req.params.id,
        UpdateUserNameRequest.fromRequest(req)
      );
      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const response = await this.userservice.deleteUser(req.params.id);
      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      throw new Error("Erro interno do servidor");
    }
  }

  async updatePassword(req: Request, res: Response) {
    const user = await this.userservice.updatePasswordUser(
      req.params.id,
      UpdatePasswordRequest.fromRequest(req)
    );
    return res.status(200).json(user);
  }
}

export default UserController;
