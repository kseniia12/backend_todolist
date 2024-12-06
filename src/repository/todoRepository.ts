import { TodoEntity } from "../db/entities/todo.entity";
import { AppDataSource } from "../db/dataSource";

export const todoRepository = AppDataSource.getRepository(TodoEntity);
