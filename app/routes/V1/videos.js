import express from 'express';
import multer from 'multer';
import {} from "../../services/video.js"
import { getVideos, getAllVideos } from '../../controller/videos.js';
import {createVideoTeacher} from "../../services/video.js"

const videoRoute = express.Router();

// // Configuración de multer para guardar archivos en el sistema de archivos
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos subidos
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`); // Nombre del archivo subido
//   }
// });

// const upload = multer({ storage: storage });

videoRoute.get('/:id', getVideos);
videoRoute.get('/teacher/:id', getAllVideos);

export default videoRoute;
