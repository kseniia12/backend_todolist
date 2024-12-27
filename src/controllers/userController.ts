import type { NextFunction, Request, Response } from "express";
import { formDataUser } from "../utils/checkDataUser";
import { generateAccessToken } from "../utils/utilsToken";
import {
  createUsersServices,
  editUsersByIdServices,
  deleteUserByIdServices,
  loginUsersServices,
  getAllUsersServices,
} from "../services/userServices";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await createUsersServices(req.body);
    const checkUser = formDataUser(user);
    const token = await generateAccessToken(checkUser);
    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await loginUsersServices(email, password);
    const checkUser = formDataUser(user);
    const token = await generateAccessToken(checkUser);
    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (req.user.id) {
      const users = await getAllUsersServices();
      res.json(users);
    }
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const getUser = req.user;
    const user = formDataUser(getUser);
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

export const editUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await editUsersByIdServices(req.user.id, req.body);
    const checkUser = formDataUser(user);
    res.json(checkUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await deleteUserByIdServices(req.user.id);
    res.status(204).send("Удален");
  } catch (error) {
    next(error);
  }
};
