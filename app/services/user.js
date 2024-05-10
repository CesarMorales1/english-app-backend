import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const user = {};
user.findById = async (id) => 
{
    try {
        const user = await  prisma.user.findUniqueOrThrow(
            {
                where: 
                {
                    id_user: id
                },select:
                {
                    email: true,
                    id_user: true
                }
            })
        return {succes: true, data: user}
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError)
        {
            return {succes: false, errorCode: error.code};
        }
    }
}

export {user};