import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const insertStudent = async (idUser)  => 
    {
        try {
            await prisma.students.create(
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

export {
    insertStudent,
}