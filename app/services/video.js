import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getVideos = async (idCourse) => {
    try {
        const videos = await prisma.videos.findMany({
            where: { id_course: idCourse },
            select: {
                id_video: true,
                url: true,
                duration_video: true,
                titulo: true,
                detail_video: true
            }
        });
        return { success: true, data: videos };
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

const getAllvideosTeacher = async (idTeacher) => {
    const teacherCourses = await prisma.teachers_course.findMany({
        where: { id_teacher: idTeacher },
        select: { course: true }
    });
    return teacherCourses;
};

export {
    getVideos,
    getAllvideosTeacher
};
