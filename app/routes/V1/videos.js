import express from "express";
import { validatingTokenHeader } from "../../helpers/handlerJwt.js";
import { getVideos } from "../../controller/videos.js";

const videoRoute = express.Router();

videoRoute.get('/:id',getVideos);

export default videoRoute;