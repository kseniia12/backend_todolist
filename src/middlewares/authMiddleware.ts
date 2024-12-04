import { UserEntity } from "src/db/entities/user.entity";
import { userRepository } from "../repository/userRepository";
import { jwtVerifyToken } from "../utils/utilsToken";

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    const userDataToken = await jwtVerifyToken(token);
    const id = userDataToken.id;
    const userData = await userRepository.findOneBy({ id });
    if (userData) {
      req.user = userData as Partial<UserEntity>;
      next();
    }
  } catch (err) {
    res.status(403).json({ err: err.message });
  }
};
