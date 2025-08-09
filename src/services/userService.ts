import * as userModel from '../models/userModel';
import bcrypt from 'bcrypt';
import { User } from '../types';

export const createUser = async (name: string, email: string, password: string, cargo_id: number): Promise<User> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return userModel.create(name, email, hashedPassword, cargo_id);
};

export const getUsersWithCargos = async (): Promise<any[]> => {
    return userModel.findAllWithCargo();
};

export const getUserById = async (id: number) => {
  const user = await userModel.findByIdWithCargo(id);
  return user;
};

export const updateUser = async (id: number, name: string, email: string, cargo_id: number): Promise<User> => {
    return userModel.update(id, name, email, cargo_id);
};

export const updateUserStatus = async (id: number, isActive: boolean): Promise<User> => {
  return userModel.updateStatus(id, isActive);
};

export const deleteUserService = async (id: number): Promise<void> => {
  await userModel.deleteUser(id);
};

// export const deactivateUser = async (id: number): Promise<User> => {
//     return userModel.deactivate(id);
// };