import type { Request, Response } from "express";
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
): Promise<void> => {
  try {
    const user = await createUsersServices(req.body);
    const checkUser = formDataUser(user);
    const token = await generateAccessToken(checkUser);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await loginUsersServices(email, password);
    if (!user) {
      throw new Error("User not found");
    }
    const checkUser = formDataUser(user);
    const token = await generateAccessToken(checkUser);
    res.status(201).json({ user, token });
  } catch (error) {
    let status = 500;
    if ((error.message = "User not found")) {
      status = 403;
    }
    res.status(status).json({ error: error.message });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if (req.user.id) {
      const users = await getAllUsersServices();
      res.json(users);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user = req.user;
    const checkUser = formDataUser(user);
    res.json(checkUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user = await editUsersByIdServices(req.user.id, req.body);
    const checkUser = formDataUser(user);
    res.json(checkUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await deleteUserByIdServices(req.user.id);
    res.status(204).send("Удален");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
