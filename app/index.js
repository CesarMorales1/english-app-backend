import express from "express";
import cors from "cors";
import routesToUse from "../app/routes/index.js";
import morgan from "morgan";
import passport from "passport"; 
import passportStrategy from "./helpers/handlerJwtPassport.js";
const app = express();
//TODO: como estamos en local buscamos el puerto que se encuentra libre para el despliegue de la aplicacion
const {PORT = 0} = process.env;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(`/${process.env.ROUTE_VERSION}/`, routesToUse);
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
passportStrategy(passport);
app.use(express.urlencoded({ extended: true }));

//evitando la filtracion de informacion acerca del servidor web
app.disable("x-powered-by");

app.listen(PORT, function () {
  //buscnado puerto libre
  console.log(`Escuchando en el puerto ${this.address().port}`);
});
