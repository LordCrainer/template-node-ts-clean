import { IUserModel } from "./user.model";

export interface IUserRepository {
  /**
   * @returns {Promise<IUserModel[]>}
   * @memberof IUserService
   */
  find(id: string): Promise<IUserModel[]>;

  /**
   * @param {string} id
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  findOne(
    id: string
  ): Promise<IUserModel>;

  /**
   * @param {string} id
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  updateOne(id: string, body: IUserModel): Promise<Boolean>;

  /**
   * @param {IUserModel} IUserModel
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  save(body: IUserModel): Promise<IUserModel>;

  /**
   * @param {string} id
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  deleteOne(id: string): Promise<Boolean>;
}
