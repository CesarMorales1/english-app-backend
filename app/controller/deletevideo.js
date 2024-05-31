import { deleteVideo } from "../services/deletevideo.js";

export const deleteVideoController = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedVideo = await deleteVideo(id);
    res.status(200).json({
      message: "Video deleted successfully",
      video: deletedVideo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
