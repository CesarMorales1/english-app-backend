import * as profesorService from "../services/profesor.js"
const getProfesors = async (req,res,next) => 
    {
        //devolviendo todos los profesores
        try {
            const registeredProfesors = await profesorService.getProfesors();
            if(registeredProfesors.success)
                {
                    res.status(201).send({message: 'Profesores obtenidos con exito',success: true,data: registeredProfesors});
                }else {
                    const errorManagement = prismaHandledErrors(createUserResult.errorCode, createUserResult.informacionAdicional);
                    res.status(errorManagement.status).send(errorManagement.respuesta);
                  }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: error.message, success: false });
        }
    }

export {
    getProfesors,
}