import { verifyPassword } from "../utils/hashing";
import { userRepository } from "../repository/userRepository";
import * as dotenv from "dotenv";
import { hashPassword } from "../utils/hashing";
dotenv.config();

export const createUsersServices = async (userData) => {
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
    throw new Error("Пользователь не найден");
  }
  const isValid = verifyPassword(password, user.password);

  if (!isValid) {
    throw new Error("Неверный пароль");
  }
  return user;
};

export const getAllUsersServices = async () => {
  return await userRepository.find();
};

export const getUsersByIdServices = async (id) => {
  return await userRepository.findOneBy({ id });
};

export const editUsersByIdServices = async (id, userData) => {
  const u = await userRepository.findOneBy({ id });
  return userRepository.save({ ...u, ...userData });
};

export const deleteUserByIdServices = async (id) => {
  await userRepository.delete(id);
};
