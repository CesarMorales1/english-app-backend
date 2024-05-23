import express from "express";
import {getProfesors} from "../../controller/profesor.js";
const profesorRouter = express.Router();

profesorRouter.get('/',getProfesors);

export default profesorRouter;

