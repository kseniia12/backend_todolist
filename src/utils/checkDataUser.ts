import { UserEntity } from "src/db/entities/user.entity";

export const formDataUser = (user: UserEntity): Partial<UserEntity> => {
  delete user.password;
  return { ...user };
};
