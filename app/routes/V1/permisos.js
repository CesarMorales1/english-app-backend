import express from "express";
import { getPermisos } from "../controllers/permisosController.js";

const router = express.Router();

router.get("/", getPermisos);

export default router;
