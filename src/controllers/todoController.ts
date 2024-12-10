import { Request, Response } from "express";
import {
  createTodoServices,
  deleteAllTodoServices,
  deleteTodoByIdServices,
  editTodoByIdServices,
  getAllTodosServices,
} from "../services/todoServices";

export const createTodo = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user = req.user.id;
    const todo = await createTodoServices(user, req.body);
    res.status(201).json({ todo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllTodos = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user = req.user.id;
    const todo = await getAllTodosServices(user);
    res.json({ todo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editTodoById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userID = req.user.id;
    const todo = await editTodoByIdServices(userID, req.params.id, req.body);
    res.json({ todo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTodoById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userID = req.user.id;
    console.log(userID);
    console.log(req.params.id);
    await deleteTodoByIdServices(userID, req.params.id);
    const todo = await getAllTodosServices(userID);
    res.json({ todo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAllTodos = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user = req.user.id;
    const todos = await deleteAllTodoServices(user);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
