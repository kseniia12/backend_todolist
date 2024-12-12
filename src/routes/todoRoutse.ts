import { Router } from "express";
import {
  createTodo,
  deleteAllCompleted,
  deleteAllTodos,
  deleteTodoById,
  editTodoById,
  getAllTodos,
} from "../controllers/todoController";
import { authenticateToken } from "../middlewares/authMiddleware";

export const todoRoutse = Router();
todoRoutse.post("", authenticateToken, createTodo); // 1 +
todoRoutse.get("", authenticateToken, getAllTodos); // 2 +
todoRoutse.patch("/:id", authenticateToken, editTodoById); // 3 +
todoRoutse.delete("", authenticateToken, deleteAllTodos); // 4
todoRoutse.delete("/:id", authenticateToken, deleteTodoById); //5 +
todoRoutse.patch("", authenticateToken, deleteAllCompleted);
// 1 - создать туду post
// 2 - Получить все туду get
// 3 - отредактировать туду по id puch
// 4 - удалить все туду delete
// 5 - удалить одну туду по id
