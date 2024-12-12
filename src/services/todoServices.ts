import { userRepository } from "../repository/userRepository";
import { todoRepository } from "../repository/todoRepository";
import * as dotenv from "dotenv";

dotenv.config();
export const createTodoServices = async (id, todo) => {
  const user = await userRepository.findOneBy({ id });
  if (!user) {
    throw new Error("User not found");
  }
  const newTodo = todoRepository.create({
    text: todo.text,
    user: user,
  });
  return await todoRepository.save(newTodo);
};

export const getAllTodosServices = async (id, filter) => {
  const user = await userRepository.findOneBy({ id });
  const todos = await todoRepository.find({ where: { user: { id: id } } });
  if (!user) {
    throw new Error("User not found");
  }
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

export const editTodoByIdServices = async (userId, todoId, userData) => {
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    throw new Error("User not found");
  }
  const todos = await todoRepository.find({ where: { user: { id: userId } } });
  const todo = todos.find((item) => item.id == todoId);
  if (!todo) {
    throw new Error("Todo not found");
  }
  const updatedTodo = await todoRepository.save({ ...todo, ...userData });
  return updatedTodo;
};

export const deleteTodoByIdServices = async (userId, todoId) => {
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    throw new Error("User not found");
  }
  const todos = await todoRepository.find({ where: { user: { id: userId } } });
  const todo = todos.find((item) => item.id == todoId);
  await todoRepository.delete(todo.id);
};

export const deleteAllTodoServices = async (userId) => {
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    throw new Error("User not found");
  }
  const todos = await todoRepository.find({ where: { user: { id: userId } } });
  const trueTodos = todos.filter((todo) => todo.completed === true);
  todoRepository.remove(trueTodos);
};

export const deleteAllTodosCompletedServices = async (todos) => {
  const allCompleted = todos.every((todo) => todo.completed);
  const allTasksNotCompleted = todos.map((todo) => ({
    ...todo,
    completed: !allCompleted,
  }));
  return await todoRepository.save(allTasksNotCompleted);
};
