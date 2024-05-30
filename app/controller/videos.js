import * as videoServices from "../services/video.js";
import {prismaHandledErrors} from "../models/errorDatabaseClass.js"
import { getProfesor } from "../services/profesor.js";
const getVideos = async (req,res,next) => 
    {
        try {
            const {id:idCourse} = req.params;
            console.log('aqui' + idCourse);
            const getVideosResult = await videoServices.getVideos(Number(idCourse));
            console.log(getVideosResult.data);
            if(getVideosResult.success)
                {
                    return res.status(201).send({success: true,data:getVideosResult.data})
                }
            else
            {
                const errorManagement = prismaHandledErrors(getVideosResult.errorCode, getVideosResult.informacionAdicional);
                res.status(errorManagement.status).send(errorManagement.respuesta);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: error.message, success: false });
        }
    }

    const getAllVideos = async (req, res, next) => {
        try {
            const { id: idUser } = req.params;
            const { id_teacher } = await getProfesor(idUser);
            let profesorCourses = await videoServices.getAllvideosTeacher(id_teacher);
    
            const courseVideosPromises = profesorCourses.map(async (course) => {
                const { data } = await videoServices.getVideos(course.course.id_course);
                return data; // Devolvemos los datos de los videos
            });
    
            // Esperamos a que todas las promesas se resuelvan
            const allCourseVideos = await Promise.all(courseVideosPromises);
    
            // Aplanamos el array si es necesario (si deseas tener un array plano de videos)
            const flattenedVideos = allCourseVideos.flat();
            return res.status(200).send({ success: true, data: flattenedVideos });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: error.message, success: false });
        }
    };
    

export 
{
    getVideos,
    getAllVideos
}