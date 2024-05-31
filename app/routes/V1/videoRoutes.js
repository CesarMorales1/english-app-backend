import { Router } from "express";
import multer from "multer";
import { uploadVideoController } from "../../controller/videoController.js";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("url"), (req, res, next) => {
  console.log("Request body:", req.body); // Agregar registro para imprimir el cuerpo de la solicitud
  uploadVideoController(req, res, next);
});

export default router;
