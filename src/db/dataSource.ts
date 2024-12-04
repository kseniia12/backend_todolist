import { DataSource } from "typeorm";

import config from "../config/config";
export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.database.host,
  port: Number(config.database.port),
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  synchronize: false,
  logging: false,
  entities: [`${__dirname}/entities/**/*{.ts,.js}`],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
});
