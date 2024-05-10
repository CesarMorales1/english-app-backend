import express from "express";
import { validatingTokenHeader } from "../../helpers/handlerJwt.js";

const videoRoute = express.Router();

videoRoute.get('/',validatingTokenHeader,() => console.log('qlq'));

export default videoRoute;