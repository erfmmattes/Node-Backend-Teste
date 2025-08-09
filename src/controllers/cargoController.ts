import { Request, Response } from 'express';
import * as cargoService from '../services/cargoService';

export const createCargo = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name } = req.body;
        const newCargo = await cargoService.createCargo(name);
        return res.status(201).json(newCargo);
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao criar cargo' });
    }
};

export const getCargos = async (req: Request, res: Response): Promise<Response> => {
    try {
        const cargos = await cargoService.getCargos();
        return res.status(200).json(cargos);
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao buscar cargos' });
    }
};

export const getCargo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const cargo = await cargoService.getCargoById(id);
    if (!cargo) {
      return res.status(404).json({ error: 'Cargo não encontrado' });
    }

    return res.status(200).json(cargo);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar cargo' });
  }
};


export const updateCargo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'O nome do cargo é obrigatório.' });
    }

    const updatedCargo = await cargoService.updateCargo(id, name);
    return res.status(200).json(updatedCargo);
  } catch (error) {
    console.log("error::",error);
    return res.status(500).json({ error: 'Erro ao atualizar cargo.' });
  }
};

export const deleteCargo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const cargo = await cargoService.getCargoById(id);
    if (!cargo) {
      return res.status(404).json({ error: 'Cargo não encontrado' });
    }

    const linkedUsersCount = await cargoService.countUsersByCargo(id);
    if (linkedUsersCount > 0) {
      return res.status(400).json({ error: 'Não é possível excluir este cargo porque existem usuários vinculados a ele.' });
    }

    await cargoService.deleteCargoById(id);

    return res.status(200).json({ message: 'Cargo deletado com sucesso' });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao deletar cargo' });
  }
};