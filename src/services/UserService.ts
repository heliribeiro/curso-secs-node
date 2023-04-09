import { prisma } from "../../connection";
import { hash } from "bcrypt";
interface IUser {
  name: string;
  email: string;
  password: string;
}

class UserService {
  async create({ name, email, password }: IUser) {
    let password_hash = await hash(password, 6);

    await prisma.user.create({
      data: {
        name,
        email,
        password_hash,
      },
    });
  }
}

export default new UserService();
