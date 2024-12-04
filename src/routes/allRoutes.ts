import { authRouter } from "./authRoutse";
import { Router } from "express";
import { userRouter } from "./userRoutes";
const allRouter = Router();

allRouter.use("/auth", authRouter);
allRouter.use("/users", userRouter);

export default allRouter;
