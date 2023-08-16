import { AppDataSource } from "../../data-source"
import { Users } from "../../entities/users.entities"
import {
  TUserResponse,
  TUserRequestUpdate,
} from "../../interfaces/user.interfaces"
import { userSchemaResponse } from "../../schemas/user.schema"
import { Address } from "./../../entities/address.entities"

export const updateUserService = async (
  userId: number,
  userData: TUserRequestUpdate
): Promise<TUserResponse> => {
  const userRepository = AppDataSource.getRepository(Users)

  const user = await userRepository.findOne({
    where: { id: userId },
    relations: {
      address: true,
    },
  })

  if (!user) {
    throw new Error("User not found")
  }

  if (userData.address) {
    const addressRepository = AppDataSource.getRepository(Address)
    const address = await addressRepository.findOneByOrFail({
      id: user.address.id,
    })
    const updatedAddress = Object.assign(address, userData.address)
    await addressRepository.save(updatedAddress)
  }
  const updatedUser = Object.assign(user, userData)

  await userRepository.save(updatedUser)

  const userUpdate = await userRepository.findOne({
    where: { id: userId },
    relations: {
      address: true,
    },
  })

  return userSchemaResponse.parse(userUpdate)
}
