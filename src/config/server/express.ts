import Routes from "../../routes";
import enviroments from "../enviroments";
import express from "express";
import Middleware from "../middleware/middleware";
import { Enviroments } from "config/enviroments/enviroment.interface";

const app: express.Application = express();
const init = (env: Enviroments) => {
  app.set("port", env.server.port);

  app.set("secret", env.secret);

  Middleware.configure(app);

  Routes.init(app);

  return app;
};

export default init;
