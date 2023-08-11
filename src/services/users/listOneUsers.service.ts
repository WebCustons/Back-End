import { AppDataSource } from "../../data-source";
import { TUserResponse } from "../../interfaces/user.interfaces";
import { Repository } from 'typeorm';
import { Users } from "../../entities/users.entities";
import { userSchemaResponse } from '../../schemas/user.schema';

export const listOneUserService = async (userId: number): Promise<TUserResponse> => {

  const userRepository: Repository<Users> = AppDataSource.getRepository(Users);

  console.log(userId);

  const user = await userRepository.createQueryBuilder('Users')
    .leftJoinAndSelect('Users.address', 'address')
    .where('user.id = :id', { id: userId })
    .getOne();

  console.log(user);

  if (!user) {
    throw new Error("user not found");
  }

  return userSchemaResponse.parse(user);
};