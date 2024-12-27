import { Router } from "express";
import {
  createTodo,
  completeAllTodos,
  deleteAllCompletedTodos,
  deleteTodoById,
  editTodoById,
  getAllTodos,
} from "../controllers/todoController";
import { authenticateToken } from "../middlewares/authMiddleware";

export const todoRoutse = Router();
todoRoutse.post("", authenticateToken, createTodo);
todoRoutse.get("", authenticateToken, getAllTodos);
todoRoutse.patch("/:id", authenticateToken, editTodoById);
todoRoutse.delete("", authenticateToken, deleteAllCompletedTodos);
todoRoutse.delete("/:id", authenticateToken, deleteTodoById);
todoRoutse.patch("", authenticateToken, completeAllTodos);
