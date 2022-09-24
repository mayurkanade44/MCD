import express from "express";
import { auditReport, imageUploader } from "../controllers/auditController.js";

const router = express.Router();

router.route("/report").post(auditReport);
router.route("/image").post(imageUploader);

export default router;
