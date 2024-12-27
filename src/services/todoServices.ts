import * as dotenv from "dotenv";
import { todoRepository } from "../repository/todoRepository";
import { responseObjectTodo } from "../lib/componets";
import { userRepository } from "../repository/userRepository";
import { CustomError } from "../utils/errorHandler";

dotenv.config();

export const createTodoServices = async (
  userId: number,
  todo: responseObjectTodo,
) => {
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new CustomError("Not fot found", 400);
  }
  const newTodo = todoRepository.create({
    text: todo.text,
    user,
  });
  return todoRepository.save(newTodo);
};

export const getAllTodosServices = async (id: number, filter: string) => {
  const todos = await todoRepository.find({ where: { user: { id } } });
  switch (filter) {
    case "active":
      return todos.filter((todo) => todo.completed === false);
    case "completed":
      return todos.filter((todo) => todo.completed === true);
    case "all":
    default:
      return todos;
  }
};

export const editTodoByIdServices = async (
  userId: number,
  todoId: number,
  userData: responseObjectTodo,
) => {
  const todos = await todoRepository.find({ where: { user: { id: userId } } });
  const todo = todos.find((item) => item.id === todoId);
  if (!todo) {
    throw new CustomError("Todo not found", 404);
  }
  todo.text = userData.valueInputField;
  todo.completed = userData.completed;
  await todoRepository.save(todo);
  return todo;
};

export const deleteTodoByIdServices = async (
  userId: number,
  todoId: number,
) => {
  const todos = await todoRepository.find({ where: { user: { id: userId } } });
  const todo = todos.find((item) => item.id === todoId);
  if (!todo) {
    throw new CustomError("Todo not found", 404);
  }
  await todoRepository.delete(todo.id);
};

export const deleteAllCompletedTodosServices = async (userId: number) => {
  const completedTodos = await todoRepository.find({
    where: {
      user: { id: userId },
      completed: true,
    },
  });
  if (completedTodos) {
    return todoRepository.remove(completedTodos);
  }
};

export const completeAllTodosServices = async (todos: responseObjectTodo[]) => {
  const allCompleted = todos.every((todo) => todo.completed);
  const allTasksNotCompleted = todos.map((todo) => ({
    ...todo,
    completed: !allCompleted,
  }));
  return todoRepository.save(allTasksNotCompleted);
};
