import { Prisma, PrismaClient } from "@prisma/client";
import { toUserModel } from "../models/user.js";
import { encrypt,compare } from "../helpers/handleBcrypt.js";
import { creatingTokenJwt } from "../helpers/handlerJwt.js";
const prisma = new PrismaClient();

const createUser = async (objectUserData) => {
  delete objectUserData.confirmPassword;
  const {password: passwordToHash} = objectUserData;
  const passwordHashed = await encrypt(passwordToHash);
  objectUserData.password = passwordHashed;
  //transformando en la clase userModel
  objectUserData = toUserModel(objectUserData);
  console.log(objectUserData);
  try {
    //A I
    objectUserData.status = 'A';
    //TODO: Crear una clase que tenga los permisos por default de cada una de las personas dentro del sistema
    objectUserData.id_permisos = 1;
    //creando usuario y generando mensaje de error o exito
    const userCreated = await prisma.user.create({ data: objectUserData });
    //creando la session una vez registrado el usuario
    userCreated.session_token = `JWT ${creatingTokenJwt(userCreated.id_user,userCreated.email)}`;
    return { success: true, data: {...userCreated}}; 
  } catch (error) {
    if(error instanceof Prisma.PrismaClientValidationError)
      {
        return {success: false ,informacionAdicional: error.message, errorCode: "C001"}
      }
    if(error instanceof Prisma.PrismaClientKnownRequestError)
      {
      return {success: false, errorCode: error.code, informacionAdicional: error.meta};
    }
  }
};

const loginUser = async (objectUserData) => 
{
  const {email,password} = objectUserData;
  //p2025
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: email
      },select:
      {
        email: true,
        password: true,
        id_user: true,
      }
    });
    //comparar claves
    if(!await compare(password,user.password)) return {success: false,errorCode: 400, message: 'Password or user dont Match'};
    //creando variables donde guardar la informacion para el token
    const token = creatingTokenJwt(user.id_user,user.email);
    //guardando informacion para almacenar en el localStorage del usuario
    const userDataToReturn = {...user,
      session_token : `JWT ${token}`,
    };

    return {success: true,data: userDataToReturn};
    
  } catch (error) {
    if(error instanceof Prisma.PrismaClientKnownRequestError)
    {
      return {success: false,errorCode: error.code};
    }
    console.log(error);
  }
}

export {
  createUser,
  loginUser
};
