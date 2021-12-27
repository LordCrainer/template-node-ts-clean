import UserService from "../aplication/user.service";
// import { HttpError } from "../../../../config/error";
import { IUserModel } from "../domain/user.interface";
import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../user.modules";
import UserRepositoryMongo from "./user.repository.mongo";
import userDto from "../domain/user.dto";

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
    const page = parseInt((req.query.page || 0).toString(), 10);
    const limit = parseInt((req.query.limit || 10).toString(), 10);

    const users: IUserModel[] = await inyectionUserService.findAll(page, limit);
    
    apiResponse.result(res, userDto.multi(users), 200);
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
    apiResponse.result(res, userDto.single(user), 200);
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
    apiResponse.result(res, userDto.single(user), 200);
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
    const isUpdated = await inyectionUserService.update(
      req.params.id,
      req.body
    );
    apiResponse.result(res, isUpdated, 200);
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
