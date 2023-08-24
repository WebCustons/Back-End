import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/users.entities";
import { AppError } from "../../errors";
import { hashSync } from "bcryptjs"; // Importe o hashSync do bcryptjs

export const resetPassword = async (password: string, resetToken: string) => {
  const userRepository = AppDataSource.getRepository(Users);

  try {
    const user = await userRepository.findOne({
      where: {
        reset_token: resetToken,
      },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }
    user.password = hashSync(password, 10);
    user.reset_token = null;
    await userRepository.save(user);

  } catch (error) {
    console.error("Erro ao redefinir a senha:", error);
    throw new AppError("Erro ao redefinir a senha.", 500);
  }
};
