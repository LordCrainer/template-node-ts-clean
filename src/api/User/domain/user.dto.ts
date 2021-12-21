import { IUserModel } from "./user.interface";

const single = (data: IUserModel) => ({
  name: data.name,
  lastname: data.lastname,
  email: data.email,
  roleId: data.roleId,
});

const multi = (data: IUserModel[]) => data.map((d) => single(d));

export default { single, multi };
