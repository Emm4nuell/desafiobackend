import { Express } from "express";
import UserController from "../controllers/UserController";
import { errorHandler } from "../middleware/MiddlewareException";

export default (app: Express) => {
  const userController = new UserController();

  app.post("/users", (req, res) => userController.createUser(req, res));
  app.get("/users/:id", (req, res, next) =>
    userController.getUserId(req, res, next)
  );
  app.put("/users/:id", (req, res) => userController.updateUser(req, res));
  app.delete("/users/:id", (req, res) => userController.deleteUser(req, res));
  app.patch("/users/:id/password", (req, res) =>
    userController.updatePassword(req, res)
  );
  app.use(errorHandler);
};
