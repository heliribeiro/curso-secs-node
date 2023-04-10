import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const userRoutes = Router();

const userController = new UserController();

userRoutes.post("/", userController.create);
userRoutes.get("/profile", ensureAuthenticate, userController.show);

export { userRoutes };
