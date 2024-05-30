import * as videoServices from "../services/video.js";
import {prismaHandledErrors} from "../models/errorDatabaseClass.js"
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

export 
{
    getVideos,
}