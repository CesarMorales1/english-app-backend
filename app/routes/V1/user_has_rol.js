import express from "express";
import { registerUserWithRole } from "../../controller/registerController.js";

const router = express.Router();

router.post("/",(req,res,next) => 
    {
        console.log(req.body);
    } ,registerUserWithRole);

export default router;
