import { Router } from "express";
import { userRoutes } from "./UserRoutes";
import { authenticateRoutes } from "./AuthenticateRoutes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/sessions", authenticateRoutes);

export { routes };
