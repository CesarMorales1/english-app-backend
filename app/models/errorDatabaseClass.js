import { ErrorHandler } from "./errorClass.js";

const prismaHandledErrors = (errorCode,informacionAdicional) => 
{
  if(errorCode === 'P2002')
  {
    const httpCodeResponse = 400;
    const {modelName:tabla,target:columnaAfectada} = informacionAdicional;
    const respuesta = new ErrorHandler({mensaje: `Hay un campo unico afectado`,path: `Tabla afectada ${tabla}`,location: `Columna afectada ${columnaAfectada}`,httpCode:httpCodeResponse})
    return {status: httpCodeResponse,respuesta: respuesta};
  }else if(errorCode === 'P2025')
  {
    const httpCodeResponse = 404;
    const respuesta = new ErrorHandler({mensaje: 'No se encontro ningun usuario con este email'});
    return {status: httpCodeResponse,respuesta:respuesta};
  }
}
  
export{prismaHandledErrors}
  