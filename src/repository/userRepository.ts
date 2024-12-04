import { AppDataSource } from "../db/dataSource";
import { UserEntity } from "../db/entities/user.entity";

export const userRepository = AppDataSource.getRepository(UserEntity);
