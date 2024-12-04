import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  editUserById,
  deleteUserById,
} from "../controllers/userController";
import { userEditSchema, validate } from "../utils/validation";
import { authenticateToken } from "../middlewares/authMiddleware";
export const userRouter = Router();

userRouter.get("", authenticateToken, getAllUsers);
userRouter.get("/me", authenticateToken, getUserById);
userRouter.patch(
  "/me",
  authenticateToken,
  validate(userEditSchema),
  editUserById,
);
userRouter.delete("/me", authenticateToken, deleteUserById);
