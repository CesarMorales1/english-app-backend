import express from "express";
import {
  createUser,
  loginUser,
  createUserWithImage,
} from "../../controller/auth.js";
import { loginValidation, validateUserData } from "../../validators/auth.js";
const authRouter = express.Router();

//creando usuario
authRouter.post("/register", validateUserData, createUser);
/* authRouter.post('/registerWithImage',validateUserData,upload.array('image',1),createUserWithImage) */
//logueando usuario
authRouter.post("/login", loginValidation, loginUser);

export default authRouter;
