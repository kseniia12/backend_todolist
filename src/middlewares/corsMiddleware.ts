import { Handler } from "express";
import * as cors from "cors";

const corsMiddlewareWrapper: Handler = (req, res, next) => {
  const corsMiddleware = cors({
    origin: "*",
  });

  corsMiddleware(req, res, next);
};

export default corsMiddlewareWrapper;
