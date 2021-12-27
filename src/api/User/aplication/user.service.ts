import UserModel from "../domain/entities/user.model";
import { IUserModel, IUserService } from "../domain/user.interface";
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
      const user: IUserModel = new UserModel({
        email: body.email,
        password: body.password,
      });
      const saved: IUserModel = await this.userRepository.save(user);
      return saved;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async findAll(page, limit): Promise<IUserModel[]> {
    try {
      return await this.userRepository.find(page, limit);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOne(id);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async createUser(body: IUserModel): Promise<IUserModel> {
    try {
      const user: IUserModel = await UserModel.create(body);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async remove(id: string): Promise<Boolean> {
    try {
      const isDeleted = await this.userRepository.deleteOne(id);
      return isDeleted;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default UserService;
