import { AppDataSource } from "../../data-source";
import { Address } from "../../entities/address.entities";
import { Users, UserType } from "../../entities/users.entities";
import { TUserRequest, TUserResponse } from "../../interfaces/user.interfaces";
import { userSchema } from "../../schemas/user.schema";

export const createUserService = async (userData: TUserRequest): Promise<TUserResponse> => {
  const addressRepository = AppDataSource.getRepository(Address);
  const userRepository = AppDataSource.getRepository(Users);

  const { address, type_user, ...userFields } = userData;
  
  const newAddress = addressRepository.create(address);
  
  const userType: UserType = type_user as UserType;

  console.log(userFields.phone);
  
  const newUser = userRepository.create({
    ...userFields,
    type_user: userType,
    address_: newAddress
  });

  const createdUser = await userRepository.save(newUser);

  return userSchema.parse(createdUser);
};
