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

const createVideoTeacher = async () => 
    {
        const video = await prisma.videos.create(
            {
                data: {titulo: 'Class 1',course: 1,duration_video: '0:13',detail_video: 'video 1',url: 'https://firebasestorage.googleapis.com/v0/b/english-plis.appspot.com/o/dec83f97-131a-459d-b725-c10732366533-VideoProyecto.mp4?alt=media&token=2fed9fe6-140a-4659-99dc-42596384ba37'},  
                select: {id_video: true}     
            })
        await prisma.teachers_course.create(
            {
            data: {id_teacher: 1,id_course:1,}
            })
        return {success: true, data: video}
    }

export {
    getVideos,
    getAllvideosTeacher,
    createVideoTeacher
};
