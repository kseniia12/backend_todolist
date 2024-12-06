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
  return todoRepository.save(newTodo);
};

export const getAllTodosServices = async (id) => {
  const user = await userRepository.findOneBy({ id });
  if (!user) {
    throw new Error("User not found");
  }
  return await todoRepository.find({ where: { user: { id: id } } });
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
