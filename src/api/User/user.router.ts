import { Router } from "express";
import * as UserComponent from "./infraestructure/user.controller";
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
router.get("/", checkAuth.isAuthenticated, UserComponent.findAll);

/**
 * POST method route
 * @example http://localhost:PORT/v1/users
 */
router.post("/", UserComponent.create);

/**
 * GET method route
 * @example http://localhost:PORT/v1/users/:id
 */
router.get("/:id", UserComponent.findOne);

/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/users/:id
 */
router.delete("/:id", UserComponent.remove);

/**
 * @export {express.Router}
 */
export default router;
