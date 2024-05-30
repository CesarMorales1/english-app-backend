import { Prisma, PrismaClient } from "@prisma/client";
import { toUserModel } from "../models/user.js";
import { encrypt, compare } from "../helpers/handleBcrypt.js";
import { creatingTokenJwt } from "../helpers/handlerJwt.js";
import { insertProfesor } from "../services/profesor.js";
import { insertStudent } from "./student.js";
import { getCourseStudent } from "./course.js";
import { getStudent } from "./student.js";

const prisma = new PrismaClient();

const createUser = async (objectUserData) => {
  const { password: passwordToHash, id_rol, id_courses } = objectUserData;
  //Eliminando datos innecesarios
  delete objectUserData.confirmPassword;
  delete objectUserData.id_rol;
  delete objectUserData.id_courses;
  delete objectUserData.id_teacher;

  //encriptando password
  const passwordHashed = await encrypt(passwordToHash);
  objectUserData.password = passwordHashed;

  //transformando en la clase userModel
  objectUserData = toUserModel(objectUserData);

  //TODO: Crear una clase que tenga los permisos por default de cada una de las personas dentro del sistema
  //Valores por defecto
  objectUserData.status = "A";
  objectUserData.id_permisos = 1;

  try {
    //creando usuario y generando mensaje de error o exito
    const userCreated = await prisma.user.create({ data: objectUserData });
    //creando la session una vez registrado el usuario
    userCreated.session_token = `JWT ${creatingTokenJwt(
      userCreated.id_user,
      userCreated.email
    )}`;
    //agregando valores a la tabla user_has_roles
    await userHasRolesInsert(userCreated.id_user, id_rol);

    //insertar en la tabla estudiante o profesor dependiendo del rol
    if (id_rol === 1) {
      await insertStudent(userCreated.id_user, id_courses);
    } else if (id_rol === 2) {
      //TODO: hacerlo dinamico
      const {id_teacher} = await insertProfesor(userCreated.id_user);
      return {success: true, data: {...userCreated,id_rol,id_teacher}}
    }
    const{ id_student: idStudent } = await getStudent(userCreated.id_user);
    const {id_course: idCourse} = await getCourseStudent(idStudent);
    // console.log(idStudent,idCourse);
    return { success: true, data: {...userCreated,id_rol,idCourse}}; 
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      return {
        success: false,
        informacionAdicional: error.message,
        errorCode: "C001",
      };
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        success: false,
        errorCode: error.code,
        informacionAdicional: error.meta,
      };
    }
  }
};

const loginUser = async (objectUserData) => {
  const { email, password } = objectUserData;
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { email: email },
      select: {
        email: true,
        password: true,
        id_user: true,
        full_name: true,
        numero: true,
        image: true,
      },
    });
    if (!(await compare(password, user.password)))
      return {
        success: false,
        errorCode: 400,
        message: "Password or user don't match",
      };
    const token = creatingTokenJwt(user.id_user, user.email);
    const userRol = await userHasRolesGet(user.id_user);
    if(Number(userRol.id_rol) === 2)
      {
        const userDataToReturn = 
        {
          ...user,
          session_token: `JWT ${token}`,
          id_rol: userRol.id_rol
        }
        return {success: true,data: userDataToReturn}
      }
    const{ id_student: idStudent } = await getStudent(user.id_user);
    const {id_course: idCourse} = await getCourseStudent(idStudent);
    const userDataToReturn = {
      ...user,
      session_token: `JWT ${token}`,
      id_student: idStudent,
      idCourse: idCourse,
      id_rol: userRol.id_rol, // Asegurarnos de devolver id_rol correctamente
    };
    return { success: true, data: userDataToReturn };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { success: false, errorCode: error.code };
    }
    console.error(error);
  }
};

/* const loginUser = async (objectUserData) => {
  const { email, password } = objectUserData;
  //p2025
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: email,
      },
      select: {
        email: true,
        password: true,
        id_user: true,
      },
    });
    //comparar claves
    if (!(await compare(password, user.password)))
      return {
        success: false,
        errorCode: 400,
        message: "Password or user dont Match",
      };
    //creando variables donde guardar la informacion para el token
    const token = creatingTokenJwt(user.id_user, user.email);
    //guardando informacion para almacenar en el localStorage del usuario
    const userRol = await userHasRolesGet(user.id_user);
    const userDataToReturn = {
      ...user,
      session_token: `JWT ${token}`,
      id_rol: userRol,
    };
    return { success: true, data: userDataToReturn };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { success: false, errorCode: error.code };
    }
  }
};
 */
//TODO: pasar a services de user_has_roles
const userHasRolesInsert = async (userID, rolID) => {
  const statusDefaultValue = "A";
  try {
    const result = await prisma.user_has_roles.create({
      data: {
        id_user: userID,
        id_rol: rolID,
        status: statusDefaultValue,
      },
    });
    return result;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      return {
        success: false,
        informacionAdicional: error.message,
        errorCode: "C001",
      };
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        success: false,
        errorCode: error.code,
        informacionAdicional: error.meta,
      };
    }
  }
};

const userHasRolesGet = (userId) => {
  try {
    return prisma.user_has_roles.findFirst({
      where: {
        id_user: userId,
      },
      select: {
        id_rol: true,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { success: false, errorCode: error.code };
    }
    console.log(error);
  }
};

export { createUser, loginUser };
