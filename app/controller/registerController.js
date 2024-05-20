import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const registerUserWithRole = async (req, res) => {
  const { userId, roleId } = req.body;

  try {
    const userHasRol = await prisma.user_has_roles.create({
      data: {
        id_user: userId,
        id_rol: roleId,
        status: "A", // Asegúrate de que este valor sea un solo carácter
      },
    });

    res
      .status(201)
      .json({ message: "User role assigned successfully", data: userHasRol });
  } catch (error) {
    console.error("Error assigning user role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
