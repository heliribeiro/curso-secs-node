import { User } from "@prisma/client";
import { prisma } from "../../connection";
import { compare, hash } from "bcrypt";

interface IAuthenticate {
  email: string;
  password: string;
}

class AuthenticateService {
  async create({ email, password }: IAuthenticate): Promise<User> {
    let password_hash = await hash(password, 6);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Email ou senha não encontrados");
    }

    let paswordMatch = await compare(password, user.password_hash);
    if (!paswordMatch) {
      throw new Error("Email ou senha não encontrados");
    }

    return user;
  }
}

export default new AuthenticateService();
