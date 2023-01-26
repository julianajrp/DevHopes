import "dotenv/config";
import AppDataSource from "../../data-source";
import User from "../../entities/users.entity";
import { IUserLogin } from "../../interfaces/users.interface";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { AppError } from "../../errors/AppError";

const createSessionService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    email: email,
  });
  if (!user) {
    throw new AppError("user or password incorret", 403);
  }

  if (!user.isActive) {
    throw new AppError("user is already deactivated", 400);
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("user or password incorret", 403);
  }
  const token = jwt.sign(
    {
      isActive: user.isActive,
    },
    process.env.SECRET_KEY,
    {
      subject: String(user.id),
      expiresIn: "24h",
    }
  );

  return token;
};

export default createSessionService;
