import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const deleteVideo = async (id_video) => {
  try {
    const deletedVideo = await prisma.videos.delete({
      where: { id_video: parseInt(id_video, 10) },
    });
    return deletedVideo;
  } catch (error) {
    throw new Error(`Error deleting video: ${error.message}`);
  }
};
