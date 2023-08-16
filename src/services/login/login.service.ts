import * as bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import "dotenv/config"
import { AppDataSource } from "../../data-source"
import { Users } from "../../entities/users.entities"
import { AppError } from "../../errors"
import { TLogin, loginResponse } from "../../interfaces/login.interfaces"

const loginService = async (userData: TLogin): Promise<loginResponse> => {
  const userRepository = AppDataSource.getRepository(Users)

  const userResponse = await userRepository.findOneBy({ email: userData.email })

  if (!userResponse) {
    throw new AppError("Invalid credentials", 401)
  }

  const comparePassword = await bcrypt.compare(
    userData.password,
    userResponse.password
  )

  if (!comparePassword) {
    throw new AppError("Invalid credentials", 401)
  }

  const token = jwt.sign(
    { email: userResponse.email, subject: userResponse.id },
    process.env.SECRET_KEY!,
    { expiresIn: "1d" }
  )

  const response: loginResponse = {
    token: token,
    id: userResponse.id,
  }

  return response
}

export default loginService
