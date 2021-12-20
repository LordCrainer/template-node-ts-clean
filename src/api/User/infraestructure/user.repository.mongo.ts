import Joi from "joi";
import { Types } from "mongoose";

// import CopounValidation from "../domain/copoun.validation";
import userModel, { IUserModel } from "../domain/user.model";
import { IUserRepository } from "../domain/user.repository";

const UserRepositoryMongo: IUserRepository = {
  async find(id: string) {
    try {
      return await userModel.find({ _id: id });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async findOne(id) {
    try {
      /*       const validate: Joi.ValidationResult = CopounValidation.getCopoun({
        id,
      });

      if (validate.error) throw new Error(validate.error.message); */

      return await userModel.findOne({ _id: id });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async updateOne(id, body) {
    try {
      /*       const validate: Joi.ValidationResult = CopounValidation.editCopoun(body);

      if (validate.error) throw new Error(validate.error.message); */

      const updatedCopoun = await userModel.updateOne(
        { _id: id },
        { $set: body }
      );

      return !!updatedCopoun;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async save(body) {
    try {
      /*       const validate: Joi.ValidationResult =
        CopounValidation.createCopoun(body);

      if (validate.error) {
        throw new Error(validate.error.message);
      } */

      const copoun: IUserModel = await userModel.create(body);

      return copoun;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async deleteOne(id) {
    try {
      /*       const validate: Joi.ValidationResult = CopounValidation.removeCopoun({
        id,
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      } */

      const copoun: IUserModel = await userModel.findOneAndRemove({
        _id: new Types.ObjectId(id),
      });

      return !!copoun;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
export default UserRepositoryMongo;
