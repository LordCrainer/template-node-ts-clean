// import { AuthRouter } from "./../api/index.router";
import express from "express";
import http from "http";
import transcodingRouter from "../api/transcoding/infraestructure/transcoding.router";
import uploadRouter from "../api/upload/upload.router";
import UserRouter from "../api/User/user.router";
import AuthRouter from "../api/auth/auth.router";
import swaggerRouter from "./swaggerRouter";

const init = (app: express.Application) => {
  const router: express.Router = express.Router();

  //app.use('/v1/users', jwtConfig.isAuthenticated, UserRouter);
  app.use("/v1/user", UserRouter);
  app.use("/v1/auth", AuthRouter);

  app.use("v1/transcoding", transcodingRouter);

  app.use("v1/upload", uploadRouter);

  swaggerRouter.init(app);

  app.use((req, res, next) => {
    res.status(404).send(http.STATUS_CODES[404]);
  });

  /**
   * @constructs all routes
   */
  app.use(router);
};

export default { init };
