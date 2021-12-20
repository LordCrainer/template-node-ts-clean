import { Router } from "express";
import uploadController from "./infraestructure/upload.controller";
import multer from "../../config/middleware/multer";
const cpUpload = multer.handle.fields([
  { name: "files", maxCount: 1 },
  { name: "params", maxCount: 8 },
]);
const router = Router();

router.post(
  "/onefile",
  multer.handle.single("files"),
  uploadController.uploadOneFile
);
router.post("/metadata", cpUpload, uploadController.uploadMetadata);

export default router;
