import { DeepPartial } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Adverts } from "../../entities/adverts.entities"
import { AppError } from "../../errors"
import {
  TAdvert,
  TAdvertRequestUpdate,
  TAdvertResponse,
} from "../../interfaces/advert.interfaces"
import {
  advertSchema,
  advertSchemaResponse,
} from "./../../schemas/advert.schema"
import { Users } from "../../entities/users.entities"

export const updateAdvertService = async (
  advertId: number,
  userId: number,
  advertData: TAdvertRequestUpdate
): Promise<TAdvertResponse> => {
  const userRepository = AppDataSource.getRepository(Users)

  const user = await userRepository.findOneBy({ id: userId })

  const advertRepository = AppDataSource.getRepository(Adverts)

  const oldDataAdvert = await advertRepository.findOne({
    where: { id: advertId },
  })

  if (!oldDataAdvert) {
    throw new AppError("Advert not found", 404)
  }

  const newDataAdvert = advertRepository.create({
    ...oldDataAdvert,
    ...advertData,
    Users: user,
  } as DeepPartial<Adverts>)

  await advertRepository.save(newDataAdvert)

  const validateResponse = advertSchemaResponse.parse(newDataAdvert)

  return advertSchema.parse(validateResponse)
}
