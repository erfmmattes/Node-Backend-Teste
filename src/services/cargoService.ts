import * as cargoModel from '../models/cargoModel';
import { Cargo } from '../types';

export const createCargo = async (name: string): Promise<Cargo> => {
    return cargoModel.create(name);
};

export const getCargos = async (): Promise<Cargo[]> => {
    return cargoModel.findAll();
};

export const getCargoById = async (id: number): Promise<Cargo | null> => {
  return cargoModel.findOne(id);
};

export const updateCargo = async (id: number, name: string): Promise<Cargo> => {
  if (!name) throw new Error('Nome do cargo é obrigatório');
  const updatedCargo = await cargoModel.update(id, name);
  return updatedCargo;
};

export const deleteCargoById = async (id: number): Promise<void> => {
  await cargoModel.deleteOne(id);
};

export const countUsersByCargo = async (cargoId: number): Promise<number> => {
  return cargoModel.countUsersByCargoId(cargoId);
};