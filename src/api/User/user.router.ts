import { Router } from "express";
import * as UserComponent from "./infraestructure/user.controller";
import userValidation from "./domain/user.validation";
import validator from "../shared/application/validator";
import authController from "../auth/infraestructure/auth.controller";

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * GET method route
 * @example http://localhost:PORT/v1/users
 *
 */
router.get("/", authController.isAuthenticated, UserComponent.findAll);

/**
 * POST method route
 * @example http://localhost:PORT/v1/users
 */
router.post(
  "/",
  authController.isAuthenticated,
  validator(userValidation.create),
  UserComponent.create
);

/**
 * GET method route
 * @example http://localhost:PORT/v1/users/:id
 */
router.get(
  "/:id",
  authController.isAuthenticated,
  validator(userValidation.getOne),
  UserComponent.findOne
);

/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/users/:id
 */
router.delete("/:id", UserComponent.remove);

/**
 * @export {express.Router}
 */
export default router;
