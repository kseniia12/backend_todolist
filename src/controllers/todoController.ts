import type { Request, Response } from "express";
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
    const todo = await createTodoServices(Number(req.user.id), req.body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todo = await getAllTodosServices(
      req.user.id,
      req.query.filter as string,
    );
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
    const todo = await editTodoByIdServices(
      req.user.id,
      Number(req.params.id),
      req.body,
    );
    console.log("todo", todo);
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
    await deleteTodoByIdServices(req.user.id, Number(req.params.id));
    const todo = await getAllTodosServices(req.user.id, "all");
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
    await deleteAllTodoServices(req.user.id);
    const todo = await getAllTodosServices(req.user.id, "all");
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
    const todos = await getAllTodosServices(req.user.id, "all");
    const todo = await deleteAllTodosCompletedServices(todos);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
