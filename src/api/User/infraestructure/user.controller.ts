import UserService from "../aplication/user.service";
// import { HttpError } from "../../../../config/error";
import { IUserModel } from "../domain/user.model";
import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../user.modules";
import UserRepositoryMongo from "./user.repository.mongo";

const inyectionUserService = new UserService(UserRepositoryMongo);

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
    const users: IUserModel[] = await inyectionUserService.findAll();
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
    const user = await inyectionUserService.findOne(req.params.id);
    apiResponse.result(res, user, 200);
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
    const user: IUserModel = await inyectionUserService.create(req.body);
    apiResponse.result(res, user, 200);
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
const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const isDeleted = await inyectionUserService.update(
      req.params.id,
      req.body
    );
    apiResponse.result(res, isDeleted, 200);
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
    const isDeleted = await inyectionUserService.remove(req.params.id);
    apiResponse.result(res, isDeleted, 200);
  } catch (error) {
    next(apiResponse.error(res, error.message.status, error.message));
  }
};

export { findAll, findOne, remove, create, update };
