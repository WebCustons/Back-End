import { AppDataSource } from "../../data-source";
import { Address } from "../../entities/address.entities";
import { Users, UserType } from "../../entities/users.entities";
import { TUserRequest, TUserResponse } from "../../interfaces/user.interfaces";
import { userSchemaResponse } from "../../schemas/user.schema";

export const createUserService = async (userData: TUserRequest): Promise<TUserResponse> => {

  const addressRepository = AppDataSource.getRepository(Address);
  
  const userRepository = AppDataSource.getRepository(Users);

  const { address, type_user, ...userFields } = userData;
  
  const newAddress = addressRepository.create(address);
  
  const userType: UserType = type_user as UserType;
  
  const newUser = userRepository.create({
    ...userFields,
    type_user: userType,
    address: newAddress
  });

  const createdUser = await userRepository.save(newUser);

  console.log(createdUser);
  

  return userSchemaResponse.parse(newUser);
};

