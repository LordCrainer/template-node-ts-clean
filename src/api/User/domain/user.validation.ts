import * as Joi from "joi";
import Validation from "../../validation";
import { IUserModel } from "./user.interface";

const create = Joi.object().keys({
  password: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
});
const getOne = Joi.object().keys({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  name: Joi.string(),
});

export default { create, getOne };
