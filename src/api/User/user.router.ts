import { Router } from "express";
import * as UserComponent from "./infraestructure/user.controller";
import userValidation from "./domain/user.validation";
import authController from "../auth/infraestructure/auth.controller";
import { checkAuth } from "../shared/shared.modules";

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
  checkAuth(userValidation.create),
  UserComponent.create
);

/**
 * GET method route
 * @example http://localhost:PORT/v1/users/:id
 */
router.get(
  "/:id",
  authController.isAuthenticated,
  checkAuth(userValidation.getOne),
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
