import { prisma } from "../../connection";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
interface IAuthenticate {
  email: string;
  password: string;
}

class AuthenticateService {
  async create({ email, password }: IAuthenticate) {
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

    const token = sign({}, "minhachavesecreta", {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user,
      token,
    };
  }
}

export default new AuthenticateService();
