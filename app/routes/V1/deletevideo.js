import { Router } from "express";
import { deleteVideoController } from "../../controller/deletevideo.js";

const router = Router();

router.delete("/:id", deleteVideoController);

export default router;
