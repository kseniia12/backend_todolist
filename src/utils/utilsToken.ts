import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { UserEntity } from "src/db/entities/user.entity";

export const generateAccessToken = async (user: Partial<UserEntity>) => {
  return new Promise<string>((res, rej) => {
    jwt.sign(
      { ...user },
      config.token.secret,
      { expiresIn: "180000000" },
      (err, token) => {
        if (err) {
          return rej(err);
        }
        res(token);
      },
    );
  });
};

export const jwtVerifyToken = async (
  token: string,
): Promise<{ id: number }> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.token.secret, (err, token) => {
      if (err) {
        return reject(err);
      }
      resolve(token as { id: number });
    });
  });
};
