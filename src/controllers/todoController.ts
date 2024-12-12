import { Request, Response } from "express";
import {
  createTodoServices,
  deleteAllTodosCompletedServices,
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
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllTodos = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const filter = req.query.filter;
    const user = req.user.id;
    const todo = await getAllTodosServices(user, filter);
    res.json(todo);
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
    res.json(todo);
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
    await deleteTodoByIdServices(userID, req.params.id);
    const todo = await getAllTodosServices(userID, "all");
    res.json(todo);
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
    await deleteAllTodoServices(user);
    const todo = await getAllTodosServices(user, "all");
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAllCompleted = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user = req.user.id;
    const todos = await getAllTodosServices(user, "all");
    const todo = await deleteAllTodosCompletedServices(todos);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
