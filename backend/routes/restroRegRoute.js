import express from "express";
import {
  getRestroDetails,
  restroReg,
} from "../controllers/RestroRegControlller.js";

const router = express.Router();

router.route("/restroDetails").post(restroReg)
router.route("/restroDetails/:id").get(getRestroDetails)

export default router;
