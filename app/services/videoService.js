import { PrismaClient } from "@prisma/client";
import { uploadFileToFirebase } from "../utils/firebaseConfig.js";

const prisma = new PrismaClient();

export const uploadVideo = async (
  file,
  { titulo, id_course, duration_video, detail_video }
) => {
  try {
    const publicUrl = await uploadFileToFirebase(file);

    const video = await prisma.videos.create({
      data: {
        titulo,
        id_course: parseInt(id_course, 10),
        url: publicUrl,
        duration_video: duration_video || "1:00", // Valor por defecto
        detail_video: detail_video || "Video explicativo del tema tal", // Valor por defecto
      },
    });

    return video;
  } catch (error) {
    throw new Error("Error uploading video: " + error.message);
  }
};
