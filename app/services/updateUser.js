import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateUserService = async (id, full_name, numero) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id_user: parseInt(id, 10) }, // Asegúrate de que `id_user` es un entero
      data: {
        full_name,
        numero,
      },
    });
    return { success: true, data: updatedUser };
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Error updating user");
  }
};
