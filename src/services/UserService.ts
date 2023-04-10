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

    let userAlreadExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userAlreadExists) {
      throw new Error(`User ${name} already exists`);
    }

    await prisma.user.create({
      data: {
        name,
        email,
        password_hash,
      },
    });
  }

  async show(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error(`User does not exist`);
    }
    return user;
  }
}

export default new UserService();
