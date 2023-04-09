import { prisma } from "../../connection";
import zod from "zod";
interface IUser {
  name: string;
  email: string;
  password: string;
}

class UserService {
  async create({ name, email, password }: IUser) {
    await prisma.user.create({
      data: {
        name,
        email,
        password_hash: password,
      },
    });
  }
}

export default new UserService();
