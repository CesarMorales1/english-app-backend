import { Prisma, PrismaClient } from "@prisma/client";
import { toUserModel } from "../models/user.js";
import { encrypt,compare } from "../helpers/handleBcrypt.js";
import { creatingTokenJwt } from "../helpers/handlerJwt.js";
const prisma = new PrismaClient();

const createUser = async (objectUserData) => {
  const {password: passwordToHash,id_rol} = objectUserData;
  delete objectUserData.confirmPassword;
  delete objectUserData.id_rol;
  //encriptando password
  const passwordHashed = await encrypt(passwordToHash);
  objectUserData.password = passwordHashed;
  //transformando en la clase userModel
  objectUserData = toUserModel(objectUserData);
  try {
    //A I
    objectUserData.status = 'A';
    //TODO: Crear una clase que tenga los permisos por default de cada una de las personas dentro del sistema
    objectUserData.id_permisos = 1;
    //creando usuario y generando mensaje de error o exito
    console.log(objectUserData);
    const userCreated = await prisma.user.create({ data: objectUserData });
    //creando la session una vez registrado el usuario
    userCreated.session_token = `JWT ${creatingTokenJwt(userCreated.id_user,userCreated.email)}`;
    //agregando valores a la tabla user_has_roles
    await userHasRolesInsert(userCreated.id_user,id_rol);
    return { success: true, data: {...userCreated,id_rol}}; 
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
  console.log(objectUserData);
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
      id_rol: await userHasRolesGet(user.id_user)
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


//TODO: pasar a services de user_has_roles
const userHasRolesInsert = async (userID,rolID,) => 
  {
    const statusDefaultValue = 'A';
    try {
        const result = await prisma.user_has_roles.create(
        {
          data: 
          {
            id_user : userID,
            id_rol  : rolID,
            status:  statusDefaultValue,
          }
        })
        return result;
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
  }

const userHasRolesGet = (userId)  => 
  {
    try {
      return prisma.user_has_roles.findUniqueOrThrow(
        {
          where: {id_user : userId},
          select: {
            id_rol: true
          }
        })
    } catch (error) {
      console.log(error);
    }
  }



export {
  createUser,
  loginUser
};
