import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/users.entities";
import { TUserResponse } from "../../interfaces/user.interfaces";
import { allUsersSchema } from '../../schemas/user.schema';

export const listUsersService = async (): Promise<TUserResponse[]> => {

  const UsersRepository = AppDataSource.getRepository(Users);

  const allUsers = await UsersRepository.createQueryBuilder('users')
    .leftJoinAndSelect('users.address','address')
    .getMany()

  console.log(allUsers);
  
  return allUsersSchema.parse(allUsers);
};
