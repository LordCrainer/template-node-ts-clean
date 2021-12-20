import * as Joi from "joi";
import UserModel, { IUserModel } from "../domain/user.model";
import UserValidation from "../domain/user.validation";
import { IUserService } from "../domain/user.interface";
import { Types } from "mongoose";

/**
 * @export
 * @implements {IUserModelService}
 */
const UserService: IUserService = {
  async findAll(): Promise<IUserModel[]> {
    try {
      return await UserModel.find({});
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async findOne(id: string) {
    try {
      /*       const validate: Joi.ValidationResult = UserValidation.getUser({
        id,
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      } */
      const user = await UserModel.findOne({
        _id: new Types.ObjectId(id),
      });
      return { name: user.name, email: user.email };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async insert(body: IUserModel): Promise<IUserModel> {
    try {
      /* const validate: Joi.ValidationResult = UserValidation.createUser(body);

      if (validate.error) {
        throw new Error(validate.error.message);
      } */

      const user: IUserModel = await UserModel.create(body);

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async remove(id: string): Promise<IUserModel> {
    try {
      const validate: Joi.ValidationResult = UserValidation.removeUser({
        id,
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const user: IUserModel = await UserModel.findOneAndRemove({
        _id: new Types.ObjectId(id),
      });

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default UserService;
