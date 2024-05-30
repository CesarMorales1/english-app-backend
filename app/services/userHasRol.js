import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getRol = async(idUser) =>
    {
        try {
            const rol = await prisma.user_has_roles.findUniqueOrThrow(
                {
                    where: {id_user : idUser},
                    select: {id_rol: true}
                })
            return rol
        } catch (error) {
            if(error instanceof Prisma.PrismaClientKnownRequestError)
                {
                    return {succes: false, errorCode: error.code};
                }
        }
    }
export 
{
    getRol
}