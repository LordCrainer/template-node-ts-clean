import { NextFunction, Request, Response } from "express";
import {
  http,
  jwt,
  apiResponse,
  HttpError,
  app,
} from "../../shared/shared.modules";
import { IUserModel } from "../../User/domain/user.interface";
import AuthService from "../aplication/auth.service";
import UserRepositoryMongo from "../../User/infraestructure/user.repository.mongo";
import { IController } from "../../../Shared/domain/controller.interface";
import { RequestWithUser } from "../../shared/domain/requestUser.interface";

const inyectorAuthService = AuthService(UserRepositoryMongo);

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user: IUserModel = await inyectorAuthService.createUser(req.body);
    const token: string = jwt.sign({ email: user.email }, app.get("secret"), {
      expiresIn: "60m",
    });

    apiResponse.result(
      res,
      {
        logged: true,
        token: token,
        message: "SignUp successfull",
      },
      200
    );
  } catch (error) {
    if (error.code === 500) {
      return next(new HttpError(error.message.status, error.message));
    }
    res.json({
      status: 400,
      message: error.message,
    });
  }
};

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user: IUserModel = await inyectorAuthService.getUser(req.body);

    const token: string = jwt.sign({ email: user.email }, app.get("secret"), {
      expiresIn: "60m",
    });

    apiResponse.result(
      res,
      {
        logged: true,
        token: token,
        message: "Sign successfull",
      },
      200
    );
  } catch (error) {
    if (error.code === 500) {
      return next(new HttpError(error.message.status, error.message));
    }

    res.json({
      status: 400,
      message: error.message,
    });
  }
};

const roleAuthorization =
  (roles: string | string[], permission: string): IController =>
  async (req, res, next) => {
    try {
    } catch (error) {}
  };

const isAuthenticated = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): void => {
  const token: any = req.headers["access-token"];

  if (token) {
    try {
      const user: object | string = jwt.verify(token, app.get("secret"));

      req.user = user;

      return next();
    } catch (error) {
      return next(new HttpError(401, http.STATUS_CODES[401]));
    }
  }

  return next(new HttpError(400, "No token provided"));
};

export default {
  signup,
  login,
};
