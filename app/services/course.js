import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getCourseStudent = (id_student) => 
{
    try {
        const course = prisma.user_has_course.findFirstOrThrow(
            {
                where: {id_student: id_student},
                select: {id_course: true}
            })
        return course
    } catch (error) {
        //TODO: aqui deben de saltar el try and catch cosa que no ocurre aqui
        if(error instanceof Prisma.PrismaClientKnownRequestError)
            {
                return {succes: false, errorCode: error.code};
            }
    }
}

export {getCourseStudent}