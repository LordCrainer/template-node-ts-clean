import * as Joi from "joi";
import UserModel, { IUserModel } from "../domain/user.model";
import UserValidation from "../domain/user.validation";
import { IUserService } from "../domain/user.interface";
import { Types } from "mongoose";
import { IUserRepository } from "../domain/user.repository";

/**
 * @export
 * @implements {IUserModelService}
 */
class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}
  async update(id: string, body: IUserModel): Promise<Boolean> {
    try {
      const isUpdated = await this.userRepository.updateOne(id, body);
      return isUpdated;
    } catch (error) {}
  }
  async create(body: IUserModel): Promise<IUserModel> {
    try {
      /* const validate: Joi.ValidationResult = UserValidation.createUser(body);

      if (validate.error) {
        throw new Error(validate.error.message);
      } */
      const user: IUserModel = await this.userRepository.save(body);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async findAll(): Promise<IUserModel[]> {
    try {
      return await UserModel.find({});
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async findOne(id: string) {
    try {
      /*       const validate: Joi.ValidationResult = UserValidation.getUser({
        id,
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      } */
      const user = await this.userRepository.findOne(id);
      return { name: user.name, email: user.email };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async createUser(body: IUserModel): Promise<IUserModel> {
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
  }
  async remove(id: string): Promise<Boolean> {
    try {
      const validate: Joi.ValidationResult = UserValidation.removeUser({
        id,
      });
      if (validate.error) throw new Error(validate.error.message);

      const isDeleted = await this.userRepository.deleteOne(id);
      return isDeleted;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default UserService;
