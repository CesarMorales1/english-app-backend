import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getRoles = async (req, res) => {
  try {
    const roles = await prisma.roles.findMany();
    res.json(roles);
  } catch (error) {
    console.error("Error al obtener los roles:", error);
    res.status(500).json({ error: "Error al obtener los roles" });
  }
};
