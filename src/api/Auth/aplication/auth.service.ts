import * as Joi from "joi";
import AuthValidation from "../domain/auth.validation";
import UserModel, { IUserModel } from "../../User/domain/user.model";
import { IAuthService } from "../domain/auth.interface";
import UserRepositoryMongo from "../../User/infraestructure/user.repository.mongo";
import { IUserRepository } from "../../User/domain/user.repository";

/**
 * @export
 * @implements {IAuthService}
 */
const AuthService = (userRepository: IUserRepository): IAuthService => {
  return {
    createUser: async (body: IUserModel): Promise<IUserModel> => {
      try {
        const validate: Joi.ValidationResult = AuthValidation.createUser(body);

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
        throw new Error(error);
      }
    },
    getUser: async (body: IUserModel): Promise<IUserModel> => {
      try {
        const validate: Joi.ValidationResult = AuthValidation.getUser(body);

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
