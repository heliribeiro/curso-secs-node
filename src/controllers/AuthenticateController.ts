import { Request, Response } from "express";
import authenticateService from "../services/AuthenticateService";
import Zod from "zod";

class AuthenticateController {
  async create(req: Request, res: Response): Promise<Response> {
    const userBodySchema = Zod.object({
      email: Zod.string().email(),
      password: Zod.string().min(6),
    });

    try {
      const { email, password } = userBodySchema.parse(req.body);
      const { user, token } = await authenticateService.create({
        email,
        password,
      });
      return res.status(201).send({ user, token });
    } catch (error) {
      return res.status(401).send();
    }
  }
}

export { AuthenticateController };
