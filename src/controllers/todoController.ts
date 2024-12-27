import type { Request, Response, NextFunction } from "express";
import {
  createTodoServices,
  completeAllTodosServices,
  deleteAllCompletedTodosServices,
  deleteTodoByIdServices,
  editTodoByIdServices,
  getAllTodosServices,
} from "../services/todoServices";

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const todo = await createTodoServices(Number(req.user.id), req.body);
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

export const getAllTodos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const todo = await getAllTodosServices(
      req.user.id,
      req.query.filter as string,
    );
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

export const editTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const todo = await editTodoByIdServices(
      req.user.id,
      Number(req.params.id),
      req.body,
    );
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

export const deleteTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await deleteTodoByIdServices(req.user.id, Number(req.params.id));
    const todo = await getAllTodosServices(req.user.id, "all");
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

export const deleteAllCompletedTodos = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await deleteAllCompletedTodosServices(req.user.id);
    const todo = await getAllTodosServices(req.user.id, "all");
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

export const completeAllTodos = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const todos = await getAllTodosServices(req.user.id, "all");
    const todo = await completeAllTodosServices(todos);
    res.json(todo);
  } catch (error) {
    next(error);
  }
};
