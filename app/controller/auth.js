import * as authServices from "../services/auth.js";
import { prismaHandledErrors } from "../models/errorDatabaseClass.js";
import firebaseStorage from "../utils/cloud_storage.js";
import { dirname, join } from "path";
import { writeFileSync } from "fs";

const createUser = async (req, res, next) => {
  try {
    const createUserResult = await authServices.createUser(req.body);
    if (createUserResult.success) {
      res
        .status(201)
        .send({ message: "User created successfully.", success: true });
    } else {
      const errorManagement = prismaHandledErrors(
        createUserResult.errorCode,
        createUserResult.informacionAdicional
      );
      res.status(errorManagement.status).send(errorManagement.respuesta.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message, success: false });
  }
};

const createUserWithImage = async (req, res, next) => {
  try {
    // const user = req.body
    const user = JSON.parse(req.body.user); 
    //como no recibi un file se hace con base64
    const image = req.body.image;
    // const file = req.file
    const imageJson = JSON.parse(image);
    const imageBase64 = imageJson.base64;
    // const file = user.image;
    if (imageBase64) {
      const path = `image_${Date.now()}`;
      const url = await firebaseStorage(imageBase64, path);
      if (url) {
        user.image = url;
      }
    }
    const createUserResult = await authServices.createUser(user);
    console.log('aqui' + JSON.stringify(createUserResult));
    if (createUserResult.success) {
      res.status(201).send({
        message: "User created successfully.",
        success: true,
        data: createUserResult.data,
      });
    } else {
      const errorManagement = prismaHandledErrors(
        createUserResult.errorCode,
        createUserResult.informacionAdicional
      );
      res.status(errorManagement.status).send(errorManagement.respuesta);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message, success: false });
  }
};

/* const loginUser = async (req, res, next) => {
  try {
    const loginResult = await authServices.loginUser(req.body);
    if (loginResult.success) {
      res
        .status(200)
        .send({
          message: "Usuario logueado con exito",
          data: loginResult.data,
          success: true,
        });
    } else {
      if ("message" in loginResult) {
        return res
          .status(loginResult.errorCode)
          .send({ message: loginResult.message, success: false });
      }
      const errorManagement = prismaHandledErrors(loginResult.errorCode);
      res
        .status(errorManagement.status)
        .send({ message: errorManagement.respuesta, success: false });
    }
  } catch (error) {
    res.status(500).send({ message: error.message, success: false });
  }
}; */
const loginUser = async (req, res, next) => {
  try {
    const loginResult = await authServices.loginUser(req.body);
    if (loginResult.success) {
      res.status(200).send({
        message: "Usuario logueado con éxito",
        data: loginResult.data,
        success: true,
      });
    } else {
      if ("message" in loginResult) {
        return res.status(loginResult.errorCode).send({
          message: loginResult.message,
          success: false,
        });
      }
      const errorManagement = prismaHandledErrors(loginResult.errorCode);
      res.status(errorManagement.status).send({
        message: errorManagement.respuesta.message,
        success: false,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

export { createUser, loginUser, createUserWithImage };
