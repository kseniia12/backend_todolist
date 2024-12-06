import { authRouter } from "./authRoutse";
import { Router } from "express";
import { userRouter } from "./userRoutes";
import { todoRoutse } from "./todoRoutse";
const allRouter = Router();

allRouter.use("/auth", authRouter);
allRouter.use("/users", userRouter);
allRouter.use("/todos", todoRoutse);

export default allRouter;
