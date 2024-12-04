import * as express from "express";

import "./src/types/requestOverride";
import { AppDataSource } from "./src/db/dataSource";
import allRouter from "./src/routes/allRoutes";
import config from "./src/config/config";
import corsMiddlewareWrapper from "./src/middlewares/corsMiddleware";

const app = express();

app.use(express.json());
app.use(corsMiddlewareWrapper);
app.use(express.urlencoded({ extended: true }));
app.use(allRouter);

AppDataSource.initialize()
  .then(async () => {
    console.log("Connected to db");
  })
  .catch((error) => console.log(error));

app.listen(config.server.port, function () {
  console.log("Сервер подключен");
});
