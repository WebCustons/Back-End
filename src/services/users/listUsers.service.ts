import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/users.entities";
import { TUserResponse } from "../../interfaces/user.interfaces";
import { allUsersSchema } from '../../schemas/user.schema';

export const listUsersService = async (): Promise<TUserResponse[]> => {

  const UsersRepository = AppDataSource.getRepository(Users);

  const allUsers = await UsersRepository.findOneOrFail({
    relations: {
      address:true
    }
  })

  return allUsersSchema.parse(allUsers);
};
