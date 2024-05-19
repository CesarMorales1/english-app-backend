import express from "express";
import { getRoles } from "../../controller/rolController.js";

const router = express.Router();

router.get("/", getRoles);

export default router;
