import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";
import UpdateUserNameRequest from "../models/user/UpdateUserNameRequest";
import CreateUserRequest from "../models/user/CreateUserRequest";
import UpdatePasswordRequest from "../models/user/UpdatePasswordRequest";
import AuthUser from "../models/user/AuthUser";

class UserController {
  private readonly userservice = new UserService();

  async auth(req: Request, res: Response, next: NextFunction) {
    try {
      const usertoken = await this.userservice.auth(AuthUser.fromRequest(req));
      return res.status(200).json({ token: usertoken });
    } catch (error) {
      next(error);
    }
  }

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

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Sistema acionado com sucesso!");
      const response = await this.userservice.updateUserName(
        req.params.id,
        UpdateUserNameRequest.fromRequest(req)
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.userservice.deleteUser(req.params.id);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userservice.updatePasswordUser(
        req.params.id,
        UpdatePasswordRequest.fromRequest(req)
      );
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const name = req.query.name as string | undefined;
      const email = req.query.email as string | undefined;
      const listusers = await this.userservice.findAll(
        name,
        email,
        page,
        limit
      );
      return res.status(200).json(listusers);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
