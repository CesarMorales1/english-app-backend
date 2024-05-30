// services/videoService.js
import { PrismaClient } from "@prisma/client";
import { bucket } from "../utils/firebaseConfig.js";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export const uploadVideo = async (
  file,
  { titulo, id_course, duration_video, detail_video }
) => {
  const blob = bucket.file(`${uuidv4()}-${file.originalname}`);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  return new Promise((resolve, reject) => {
    blobStream.on("error", (err) => {
      reject(err);
    });

    blobStream.on("finish", async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      // Generate a token for the file
      const token = uuidv4();
      await blob.setMetadata({
        metadata: {
          firebaseStorageDownloadTokens: token,
        },
      });

      // Make the file public
      await blob.makePublic();

      try {
        const video = await prisma.videos.create({
          data: {
            titulo,
            id_course: parseInt(id_course, 10),
            url: `${publicUrl}?alt=media&token=${token}`,
            duration_video: duration_video || "1:00", // Valor por defecto
            detail_video: detail_video || "Video explicativo del tema tal", // Valor por defecto
          },
        });
        resolve(video);
      } catch (error) {
        reject(error);
      }
    });

    blobStream.end(file.buffer);
  });
};
