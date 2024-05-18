import * as authServices from "../services/auth.js";
import { toUserModel } from "../models/user.js";
import {prismaHandledErrors} from "../models/errorDatabaseClass.js";
import firebaseStorage from "../utils/cloud_storage.js";


const createUser = async (req, res, next) => {
  try {
    //maneja las respuestas a la peticion
    const createUserResult = await authServices.createUser(req.body);
    console.log(createUserResult);
    if (createUserResult.success) {
      // User created successfully
      res.status(201).send({ message: "User created successfully.",success: true});
    } else {
      // Handle errors returned by the service
      const errorManagement = prismaHandledErrors(createUserResult.errorCode,createUserResult.informacionAdicional);
      res.status(errorManagement.status).send(errorManagement.respuesta);
    }
  } catch (error) {
    //TODO: manejar errores improvistos en la libreria prismaHandled
    console.error(error); // Log unexpected errors
    res.status(500).send({ message: error , success: false});
  }
};
const createUserWithImage = async (req, res, next) => {
  try {
    //obteniendo valores del body difiere por el uso de multer
    const user = JSON.parse(req.body.user);
    //obteniendo los files que van dentro del body esto gracias a multer
    const files = req.files;

    if(files.length > 0)
      {
        //dado que el nombre corresponde a la fecha de hoy no van a existir dos paths iguales
        const path = `image_${Date.now()}`;
        const url = await firebaseStorage(files[0],path);

        if(url)
          {
            user.image = url;
          }
      }
    //maneja las respuestas a la peticion
    const createUserResult = await authServices.createUser(user);
    if (createUserResult.success) {
      // User created successfully
      res.status(201).send({ message: "User created successfully.",success: true});
    } else {
      // Handle errors returned by the service
      const errorManagement = prismaHandledErrors(createUserResult.errorCode,createUserResult.informacionAdicional);
      res.status(errorManagement.status).send(errorManagement.respuesta);
    }
  } catch (error) {
    //TODO: manejar errores improvistos en la libreria prismaHandled
    console.error(error); // Log unexpected errors
    res.status(500).send({ message: error , success: false});
  }
};

const loginUser = async (req,res,next) => 
{
  try {
    const loginResult = await authServices.loginUser(req.body);
    if(loginResult.success)
    {
      res.status(200).send({message: 'Usuario logueado con exito', data: loginResult.data,success: true})
      return;
    }else
    {
      if('message' in loginResult) return res.status(loginResult.errorCode).send({message: loginResult.message,success: false});
      const errorManagement = prismaHandledErrors(loginResult.errorCode);
      res.status(errorManagement.status).send({message: errorManagement.respuesta, success: false});
      return;
    }
  } catch (error) {
    res.status(500).send({ message: error ,  success: false});
  }
}

export {
  createUser,
  loginUser,
  createUserWithImage
};

