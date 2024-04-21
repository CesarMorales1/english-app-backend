import { Prisma, PrismaClient } from "@prisma/client";
import { toUserModel } from "../models/user.js";
import { encrypt,compare } from "../helpers/handleBcrypt.js";
const prisma = new PrismaClient();

const createUser = async (objectUserData) => {
  const {password: passwordToHash} = objectUserData;
  const passwordHashed = await encrypt(passwordToHash);
  objectUserData.password = passwordHashed;
  //transformando en la clase userModel
  objectUserData = toUserModel(objectUserData);
  try {
    //activo hablar con alex de si es asi o no
    objectUserData.status = 'A';
    //creando usuario y generando mensaje de error o exito
    await prisma.user.create({ data: objectUserData });
    return { success: true }; 
  } catch (error) {
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
      }
    });
    //comparar claves
    if(!await compare(password,user.password)) return {success: false,errorCode: 400, message: 'Password dont match'};
    return {success: true};
    
  } catch (error) {
    if(error instanceof Prisma.PrismaClientKnownRequestError)
    {
      return {success: false,errorCode: error.code};
    }
  }
}

export {
  createUser,
  loginUser
};
