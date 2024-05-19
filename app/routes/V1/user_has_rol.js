import express from "express";
import { registerUserWithRole } from "../../controller/registerController.js";

const router = express.Router();

router.post("/", registerUserWithRole);

export default router;
