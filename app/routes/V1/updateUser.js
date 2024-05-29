import express from "express";
import { updateUser } from "../../controller/updateUser.js";

const router = express.Router();

router.put("/:id", updateUser);

export default router;
