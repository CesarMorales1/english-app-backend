import express from "express";
import { getUsers } from "../../controller/userController.js";

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get("/", getUsers);

export default router;
