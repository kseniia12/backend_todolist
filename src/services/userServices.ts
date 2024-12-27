import * as dotenv from "dotenv";
import { verifyPassword, hashPassword } from "../utils/hashing";
import { userRepository } from "../repository/userRepository";
import { userObject } from "../lib/componets";
import { CustomError } from "../utils/errorHandler";

dotenv.config();

export const createUsersServices = async (userData: userObject) => {
  const hashedPassword = hashPassword(userData.password);
  const newUser = userRepository.create({
    fullName: userData.fullName,
    email: userData.email,
    password: hashedPassword,
    dob: userData.dob,
  });
  return userRepository.save(newUser);
};

export const loginUsersServices = async (email: string, password: string) => {
  const user = await userRepository.findOne({ where: { email } });
  if (!user) {
    throw new CustomError("User not found", 404);
  }
  const passwordUser = verifyPassword(password, user.password);
  if (!passwordUser) {
    throw new CustomError("Invalid password", 401);
  }
  return user;
};

export const getAllUsersServices = async () => {
  return userRepository.find();
};

export const getUsersByIdServices = async (id: number) => {
  return userRepository.findOneBy({ id });
};

export const editUsersByIdServices = async (
  id: number,
  userData: userObject,
) => {
  const user = await userRepository.findOneBy({ id });
  return userRepository.save({ ...user, ...userData });
};

export const deleteUserByIdServices = async (id: number) => {
  await userRepository.delete(id);
};
