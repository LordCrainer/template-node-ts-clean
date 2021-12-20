import { Router } from "express";
import authController from "./infraestructure/auth.controller";

const router: Router = Router();

router.post("/signup", authController.signup);

router.get("/login", authController.login);

export default router;
