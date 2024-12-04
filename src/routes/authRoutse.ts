import { Router } from "express";
import { createUser, loginUser } from "../controllers/userController";
import {
  userLoginSchema,
  userRegistrationSchema,
  validate,
} from "../utils/validation";

export const authRouter = Router();

authRouter.post("/sign-up", validate(userRegistrationSchema), createUser);
authRouter.post("/sign-in", validate(userLoginSchema), loginUser);
