import express from "express";
import multer from "multer";
// const upload = multer({dest: 'uploads/'})

import {
  createUser,
  loginUser,
  createUserWithImage,
} from "../../controller/auth.js";
import { loginValidation, validateUserData } from "../../validators/auth.js";
const authRouter = express.Router();

//
const uploadFiles = multer({
  storage: multer.memoryStorage(),
});

//creando usuario
authRouter.post("/register", validateUserData, createUser);
//TODO: hacer validacion para esta ruta
authRouter.post('/registerWithImage',uploadFiles.single('image'),createUserWithImage)

//logueando usuario
authRouter.post("/login", loginValidation, loginUser);

export default authRouter;
