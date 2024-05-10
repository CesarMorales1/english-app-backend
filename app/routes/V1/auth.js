import express from "express";
import {createUser,loginUser} from "../../controller/auth.js"
import {loginValidation, validateUserData} from "../../validators/auth.js"
const authRouter = express.Router();

//creando usuario
authRouter.post('/register',validateUserData,createUser);
//logueando usuario
authRouter.post('/login',loginValidation,loginUser);

export default authRouter;
