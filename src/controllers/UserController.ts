import { Request, Response } from "express";
import userService from "../services/UserService";
import Zod from "zod";

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const userBodySchema = Zod.object({
      name: Zod.string(),
      email: Zod.string().email(),
      password: Zod.string().min(6),
    });

    try {
      const { name, email, password } = userBodySchema.parse(req.body);

      await userService.create({ name, email, password });
    } catch (error) {
      return res.status(409).send();
    }

    return res.status(201).send();
  }
}

export { UserController };
