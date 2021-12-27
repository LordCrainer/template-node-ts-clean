/**
 * @export
 * @interface IUserService
 */
export interface IUserService {
  /**
   * @returns {Promise<IUserModel[]>}
   * @memberof IUserService
   */
  findAll(page: number, limit: number): Promise<IUserModel[]>;

  /**
   * @param {string} code
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  findOne(code: string): Promise<{ name: string; email: string }>;

  /**
   * @param {IUserModel} IUserModel
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  create(body: IUserModel): Promise<IUserModel>;
  /**
   * @param {IUserModel} IUserModel
   * @returns {Promise<Boolean>}
   * @memberof IUserService
   */
  update(id: string, body: IUserModel): Promise<Boolean>;
  /**
   * @param {string} id
   * @returns {Promise<Boolean>}
   * @memberof IUserService
   */
  remove(id: string): Promise<Boolean>;
}

/**
 * @export
 * @interface IUserModel
 * @extends {Document}
 */
export interface IUserModel {
  name: string;
  lastname: string;
  email: string;
  password: string;
  roleId: string;
  /*   passwordResetToken: string;
  passwordResetExpires: Date; */

  /*   facebook: string; */
  tokens?: AuthToken[];

  comparePassword: (password: string) => Promise<boolean>;
  gravatar: (size: number) => string;
}

export type AuthToken = {
  accessToken: string;
  kind: string;
};
