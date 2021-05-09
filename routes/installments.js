import express from "express";
import { getInstallments } from "../controllers/installment.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getInstallments);
export default router;
