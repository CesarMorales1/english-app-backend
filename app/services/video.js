import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getVideos = async (idCourse) => 
    {
        try {
            const videos = await prisma.videos.findMany(
                {
                    where: {id_course: idCourse},
                    select: {id_video: true,
                        url: true,
                        duration_video: true,
                        titulo: true
                    }
                });
            return {success: true,data: videos};
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
    }

export
{
    getVideos
}