import express from "express";
import { auditReport } from "../controllers/auditController.js";

const router = express.Router();

router.route("/report").post(auditReport);

export default router;
