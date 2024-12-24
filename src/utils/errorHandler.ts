import * as express from "express";
export class CustomError extends Error {
  public status: number;
  public payload?: any;

  constructor(message: string, status: number, payload?: any) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

// eslint-disable-next-line prettier/prettier
export const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    console.log(">>>> 1");
    res.status(err.status).json({ message: err.message, data: err.payload });
  }
  console.log(">>>> 2");

  res.status(500).json({ message: "Server internal error" });
  next();
};
