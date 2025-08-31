import { Express } from "express";
import UserController from "../controllers/UserController";
import { errorHandler } from "../middleware/middlewareexception";
import { securityFilter } from "../middleware/securityFilter";

export default (app: Express) => {
  const userController = new UserController();

  app.post("/users", (req, res) => userController.createUser(req, res));
  app.post("/users/auth/login", (req, res, next) =>
    userController.auth(req, res, next)
  );
  app.use(securityFilter);
  app.get("/users/:id", (req, res, next) =>
    userController.getUserId(req, res, next)
  );
  app.put("/users/:id", (req, res, next) =>
    userController.updateUser(req, res, next)
  );
  app.delete("/users/:id", (req, res, next) =>
    userController.deleteUser(req, res, next)
  );
  app.patch("/users/:id/password", (req, res, next) =>
    userController.updatePassword(req, res, next)
  );
  app.use(errorHandler);
};
