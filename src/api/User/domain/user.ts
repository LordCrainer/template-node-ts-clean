import { AuthToken, IUserModel } from "./user.interface";

export class User implements IUserModel {
  name: string;
  lastname: string;
  email: string;
  password: string;
  roleId: string;
  tokens?: AuthToken[];
  comparePassword: (password: string) => Promise<boolean>;
  gravatar: (size: number) => string;
}
