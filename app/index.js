import express from "express";

const app = express();
//TODO: como estamos en local buscamos el puerto que se encuentra libre para el despliegue de la aplicacion
const {PORT = 0} = process.env;
app.use(express.json())

import routesToUse from "../app/routes/index.js";

app.use('/v1/',routesToUse);


app.listen(PORT,function()
{
    //buscnado puerto libre
    console.log(`Escuchando en el puerto ${this.address().port}`);
})





