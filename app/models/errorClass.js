class ErrorHandler extends Error
{

    constructor({mensaje = 'Ah ocurrido un error',httpCode = 500,path = '',location = ''})
    {
        super(mensaje)
        this.httpCode = httpCode;
        this.path = path;
        this.location = location;
        this.success = false;
    }

    toJSON() {
        return {
          mensaje: this.message,
          httpCode: this.httpCode,
          ruta: this.path,
          ubicacion: this.location,
        };
      }
      

}

export {ErrorHandler}
