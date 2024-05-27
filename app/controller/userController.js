import { Prisma, PrismaClient } from "@prisma/client";
import {user} from "../services/user.js"
const prisma = new PrismaClient();

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

const getUser = (userId) => 
  {
    try {
      const userInformation = user.findById(userId);
      if(userInformation.success)
        {
            
            console.log(userInformation);
            res.status(201).send({message: 'Profesores obtenidos con exito',success: true,data: userInformation});
        }else {
            const errorManagement = prismaHandledErrors(createUserResult.errorCode, createUserResult.informacionAdicional);
            res.status(errorManagement.status).send(errorManagement.respuesta);
          }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: error.message, success: false });
    }
  }

export {getUsers,getUser}
