import * as authServices from "../services/auth.js";
import { toUserModel } from "../models/user.js";
import {prismaHandledErrors} from "../models/errorDatabaseClass.js";

const createUser = async (req, res, next) => {
  try {
    //maneja las respuestas a la peticion
    const createUserResult = await authServices.createUser(req.body);
    if (createUserResult.success) {
      // User created successfully
      res.status(201).send({ message: "User created successfully." });
    } else {
      // Handle errors returned by the service
      const errorManagement = prismaHandledErrors(createUserResult.errorCode,createUserResult.informacionAdicional);
      res.status(errorManagement.status).send(errorManagement.respuesta);
    }
  } catch (error) {
    //TODO: manejar errores improvistos en la libreria prismaHandled
    console.error(error); // Log unexpected errors
    res.status(500).send({ message: error });
  }
};

const loginUser = async (req,res,next) => 
{
  try {
    const loginResult = await authServices.loginUser(req.body);
    if(loginResult.success)
    {
      res.status(200).send({message: 'Usuario logueado con exito'})
      return;
    }else
    {
      if('message' in loginResult) return res.status(loginResult.errorCode).send({message: loginResult.message});
      const errorManagement = prismaHandledErrors(loginResult.errorCode);
      res.status(errorManagement.status).send(errorManagement.respuesta);
      return;
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

export {
  createUser,
  loginUser
};

