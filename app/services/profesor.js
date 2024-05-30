import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getProfesors = async () => 
    {
        try {
            const profesors = await prisma.teachers.findMany(
                {
                    include: 
                    {
                        user: 
                        {
                            select: {full_name: true}
                        }
                    }
                });

            const teacherHasCourse = await prisma.teachers_course.findMany({
                    include: {
                        course: {
                            select: {name_course: true}
                        }
                    }
                });
            
            for(let profesor of profesors)
                {
                    profesor.full_name = profesor.user.full_name;
                    profesor.courses = teacherHasCourse.filter(item => 
                        {
                            return item.id_teacher === profesor.id_teacher;
                        })
                    delete profesor.user;
                }
            return {success: true, data: profesors}
        } catch (error) {
            console.log(error);
            if(error instanceof Prisma.PrismaClientKnownRequestError)
            {
                return {succes: false, errorCode: error.code};
            }
        }
    }

const getProfesor = async (idUser) => 
    {
        try {
            const idProfesor = await prisma.teachers.findFirstOrThrow(
                {
                    where: {id_user: Number(idUser)},
                    select: {id_teacher: true}
                })
            return {succes: true, data: idProfesor};
        } catch (error) {
            console.log(error);
            if(error instanceof Prisma.PrismaClientKnownRequestError)
            {
                return {succes: false, errorCode: error.code};
            }
        }
    }

const insertProfesor = async (idUser) => 
    {
        try {
            const result = await prisma.teachers.create(
                {
                    data: {id_user: idUser}
                })
            return result
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
 getProfesor,
}