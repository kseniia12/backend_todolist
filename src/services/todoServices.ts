import * as dotenv from "dotenv";
import { todoRepository } from "../repository/todoRepository";
import { responseObjectTodo } from "../lib/componets";
import { userRepository } from "../repository/userRepository";

dotenv.config();

export const createTodoServices = async (
  userId: number,
  todo: responseObjectTodo,
) => {
  const user = await userRepository.findOne({ where: { id: userId } });
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
  console.log(userData);
  if (!todo) {
    throw new Error("Todo not found");
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
  await todoRepository.delete(todo.id);
};

export const deleteAllTodoServices = async (userId: number) => {
  const todos = await todoRepository.find({ where: { user: { id: userId } } });
  const trueTodos = todos.filter((todo) => todo.completed === true);
  todoRepository.remove(trueTodos);
};

export const deleteAllTodosCompletedServices = async (
  todos: responseObjectTodo[],
) => {
  const allCompleted = todos.every((todo) => todo.completed);
  const allTasksNotCompleted = todos.map((todo) => ({
    ...todo,
    completed: !allCompleted,
  }));
  return todoRepository.save(allTasksNotCompleted);
};
