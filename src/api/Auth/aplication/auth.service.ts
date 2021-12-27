import * as Joi from "joi";
import UserModel from "../../User/domain/user.model";
import { IAuthService } from "../domain/auth.interface";
import UserRepositoryMongo from "../../User/infraestructure/user.repository.mongo";
import { IUserRepository } from "../../User/domain/user.repository";
import Logger from "../../../config/lib/logger";
import { IUserModel } from "api/User/domain/user.interface";
import userValidation from "api/User/domain/user.validation";

/**
 * @export
 * @implements {IAuthService}
 */
const AuthService = (userRepository: IUserRepository): IAuthService => {
  return {
    createUser: async (body: IUserModel): Promise<IUserModel> => {
      try {
        const validate: Joi.ValidationResult = userValidation.createUser(body);

        if (validate.error) {
          throw new Error(validate.error.message);
        }

        const user: IUserModel = new UserModel({
          email: body.email,
          password: body.password,
        });

        const query: IUserModel = await UserModel.findOne({
          email: body.email,
        });

        if (query) {
          throw new Error("This email already exists");
        }

        const saved: IUserModel = await userRepository.save(body);

        return saved;
      } catch (error) {
        Logger.error(`AuthService: ${error}`);
        throw new Error(error);
      }
    },
    getUser: async (body: IUserModel): Promise<IUserModel> => {
      try {
        const validate: Joi.ValidationResult = userValidation.getUser(body);

        if (validate.error) {
          throw new Error(validate.error.message);
        }

        const user: IUserModel = await UserModel.findOne({
          email: body.email,
        });

        const isMatched: boolean =
          user && (await user.comparePassword(body.password));

        if (isMatched) {
          return user;
        }

        throw new Error("Invalid password or email");
      } catch (error) {
        throw new Error(error);
      }
    },
  };
};

export default AuthService;
