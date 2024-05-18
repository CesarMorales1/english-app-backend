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
    const respuesta = new ErrorHandler({mensaje: 'No se encontro ningun usuario con esta informacion',httpCode: httpCodeResponse});
    return {status: httpCodeResponse,respuesta:respuesta};
  }else if(errorCode === 'C001')
    {
      const httpCodeResponse = 500;
      const respuesta = new ErrorHandler({mensaje: `Hay un error con las fk revisar las conexions de la tabla error: ${informacionAdicional}`,httpCode: 400});
      return {status: httpCodeResponse, respuesta: respuesta};
    }
}
  
export{prismaHandledErrors}
  