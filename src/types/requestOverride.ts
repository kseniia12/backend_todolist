import { TodoEntity } from "../db/entities/todo.entity";
import { UserEntity } from "../db/entities/user.entity";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      // eslint-disable-line @typescript-eslint/naming-convention
      user?: UserEntity;
      todo?: TodoEntity;
    }
  }
}
