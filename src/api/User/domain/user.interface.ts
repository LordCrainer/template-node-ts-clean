import { IUserModel } from "./user.model";

/**
 * @export
 * @interface IUserService
 */
export interface IUserService {
  /**
   * @returns {Promise<IUserModel[]>}
   * @memberof IUserService
   */
  findAll(): Promise<IUserModel[]>;

  /**
   * @param {string} code
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  findOne(code: string): Promise<{ name: string, email: string }>;

  /**
   * @param {IUserModel} IUserModel
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  insert(IUserModel: IUserModel): Promise<IUserModel>;

  /**
   * @param {string} id
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  remove(id: string): Promise<IUserModel>;
}
