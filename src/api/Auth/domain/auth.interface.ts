import { IController } from "Shared/domain/controller.interface";
import { IUserModel } from "../../User/domain/user.interface";

/**
 * @export
 * @interaface IAuthService
 */
export interface IAuthService {
  /**
   * @param {IUserModel} IUserModel
   * @returns {Promise<IUserModel>}
   * @memberof AuthService
   */
  createUser(IUserModel: IUserModel): Promise<IUserModel>;
  /**
   * @param {IUserModel} IUserModel
   * @returns {Promise<IUserModel>}
   * @memberof AuthService
   */
  getUser(IUserModel: IUserModel): Promise<IUserModel>;
}
