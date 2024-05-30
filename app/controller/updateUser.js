import { updateUserService } from "../services/updateUser.js";

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { full_name, numero } = req.body;

  try {
    const result = await updateUserService(id, full_name, numero);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
