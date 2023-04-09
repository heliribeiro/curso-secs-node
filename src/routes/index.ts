import { Router } from "express";
import { userRoutes } from "./UserRoutes";

const routes = Router();

routes.use("/users", userRoutes);

export { routes };
