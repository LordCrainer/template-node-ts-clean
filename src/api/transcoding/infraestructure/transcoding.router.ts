import multer from "../../../config/middleware/multer";
import { Router } from "express";
import transcoderCtrl from "./transcoding.controller";

const router: Router = Router();

router.post("/", transcoderCtrl.createTranscoding);

router.post(
  "/custom/upload",
  multer.handle.single("files"),
  transcoderCtrl.executeProgramUploaded
);

router.post("/custom", transcoderCtrl.executeAnyProgram);

export default router;
