import { uploadVideo } from "../services/videoService.js";

export const uploadVideoController = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No video file uploaded.");
  }

  try {
    const { titulo, id_course, duration_video, detail_video } = req.body;
    const video = await uploadVideo(req.file, {
      titulo,
      id_course,
      duration_video,
      detail_video,
    });
    res.status(200).json({ message: "File uploaded successfully.", video });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
