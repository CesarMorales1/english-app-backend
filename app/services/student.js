import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const insertStudent = async (idUser,idCourse)  => 
    {
        try {
            const idStudent = await prisma.students.create(
                {
                    data: {id_user: idUser}
                })
            insertUserHasCourse(idStudent.id_student,idCourse);
        } catch (error) {
            if(error instanceof Prisma.PrismaClientKnownRequestError)
                {
                    return {succes: false, errorCode: error.code};
                }
        }
    }

const getStudent = (idUser) => 
    {
        try {
            return  prisma.students.findFirstOrThrow(
                {
                    where: {id_user: idUser},
                    select: {id_student: true
                        ,user_has_course: true}
                });
                
        } catch (error) {
            console.log(error);
            if(error instanceof Prisma.PrismaClientKnownRequestError)
                {
                    return {succes: false, errorCode: error.code};
                }
        }
    }

const insertUserHasCourse = async (idStudent,idCourse) =>
{
    try {
        await prisma.user_has_course.create(
            {
                data: 
                {
                    id_course: idCourse,
                    id_student: idStudent,
                }
            })
    } catch (error) {
        console.log(error);
        if(error instanceof Prisma.PrismaClientKnownRequestError)
            {
                return {succes: false, errorCode: error.code};
            }
    }
}

export {
    insertStudent,
    getStudent
}