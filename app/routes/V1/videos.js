import express from "express";
import { validatingTokenHeader } from "../../helpers/handlerJwt.js";
import { getVideos ,getAllVideos} from "../../controller/videos.js";

const videoRoute = express.Router();

videoRoute.get('/:id',getVideos);
videoRoute.get('/teacher/:id',getAllVideos)

export default videoRoute;