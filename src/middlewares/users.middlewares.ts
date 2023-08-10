import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "../data-source"
import { Users } from "../entities/users.entities"
import { AppError } from "../errors"

export const userExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, cpf } = req.body

  const userRepository = AppDataSource.getRepository(Users)

  const existingUserByEmail = await userRepository.findOneBy({ email: email })

  const existingUserByCpf = await userRepository.findOneBy({ cpf: cpf })

  if (existingUserByEmail) {
    throw new AppError("This email already exists", 409)
  }

  if (existingUserByCpf) {
    throw new AppError("This cpf already exists", 409)
  }

  return next()
}
