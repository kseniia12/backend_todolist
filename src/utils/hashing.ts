import * as crypto from "crypto";

export const hashPassword = (password: string): string => {
  const salt = "ght";
  const hash = crypto.createHmac("sha512", salt).update(password).digest("hex");
  return hash;
};

export const verifyPassword = (password: string, hash: string): boolean => {
  const newPassword = hashPassword(password);
  return newPassword === hash;
};
