import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPermisos = async (req, res) => {
  try {
    const permisos = await prisma.permisos.findMany();
    res.json(permisos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
