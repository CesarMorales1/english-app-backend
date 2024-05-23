import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getProfesors = async () => 
    {
        try {
            const profesors = await  prisma.teachers.findMany();
            return {success: true, data: profesors}
        } catch (error) {
            if(error instanceof Prisma.PrismaClientKnownRequestError)
            {
                return {succes: false, errorCode: error.code};
            }
        }
    }

const insertProfesor = async (idUser) => 
    {
        try {
            await prisma.teachers.create(
                {
                    data: {id_user: idUser}
                })
        } catch (error) {
            if(error instanceof Prisma.PrismaClientKnownRequestError)
                {
                    return {succes: false, errorCode: error.code};
                }
        }
    }

export
{
 getProfesors,
 insertProfesor,
}