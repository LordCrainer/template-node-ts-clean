import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { apiResponse } from "../shared.modules";

const validator =
  (schema: Joi.AnySchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const { details } = error;
      const message = details.map((d) => d.message).join(",");
      apiResponse.error(res, 422, { message });
    }
    next();
  };

export default validator;
