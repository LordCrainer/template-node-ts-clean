import AuthService from "../aplication/auth.service";
import HttpError from "../../../config/error";
import { IUserModel } from "../../User/domain/user.model";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import app from "../../../config/server";
import UserRepositoryMongo from "../../User/infraestructure/user.repository.mongo";

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

    res.json({
      status: 200,
      logged: true,
      token: token,
      message: "Sign in successfull",
    });
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

    res.json({
      status: 200,
      logged: true,
      token: token,
      message: "Sign in successfull",
    });
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

export default {
  signup,
  login,
};
