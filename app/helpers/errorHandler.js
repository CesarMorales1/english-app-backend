import { validationResult } from "express-validator";
import { ErrorHandler } from "../models/errorClass.js";
const errorValidationHandling = (req,res,next) => 
{
    try {
        const listOfErrors = validationResult(req).throw();
    } catch (listOfErrors) {
        const {msg,path,location} = listOfErrors['errors'][0];
        const errorActual = new ErrorHandler({mensaje: msg,path: path,location: location,httpCode: 400,success: false})
        res.status(400).send(errorActual.toJSON())
        return;
    }
    next();
}

export
{
    errorValidationHandling
}