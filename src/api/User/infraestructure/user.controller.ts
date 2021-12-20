import UserService from "../aplication/user.service";
// import { HttpError } from "../../../../config/error";
import { IUserModel } from "../domain/user.model";
import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../user.modules";
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users: IUserModel[] = await UserService.findAll();
    apiResponse.result(res, users, 200);
  } catch (error) {
    next(apiResponse.error(res, error.message.status, error.message));
  }
};

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
const findOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await UserService.findOne(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    next(apiResponse.error(res, error.message.status, error.message));
  }
};

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user: IUserModel = await UserService.insert(req.body);

    res.status(201).json(user);
  } catch (error) {
    next(apiResponse.error(res, error.message.status, error.message));
  }
};

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user: IUserModel = await UserService.remove(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    next(apiResponse.error(res, error.message.status, error.message));
  }
};

export { findAll, findOne, remove, create };
