import { TodoEntity } from "src/db/entities/todo.entity";

export const formDataTodo = (todo: TodoEntity): Partial<TodoEntity> => {
  delete todo.user;
  return { ...todo };
};
