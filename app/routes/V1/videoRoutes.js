import { Router } from "express";
import multer from "multer";
import { uploadVideoController } from "../../controller/videoController.js";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("url"), uploadVideoController);

export default router;
