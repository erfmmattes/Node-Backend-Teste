import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, email, password, cargo_id } = req.body;
        const newUser = await userService.createUser(name, email, password, cargo_id);
        return res.status(201).json(newUser);
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao criar usuário' });
    }
};

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const users = await userService.getUsersWithCargos();
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
};

export const getUser = async (req: Request, res: Response): Promise<Response> => {
  const id = Number(req.params.id);

  try {
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { name, email, cargo_id } = req.body;
        const updatedUser = await userService.updateUser(parseInt(id), name, email, cargo_id);
        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
};

export const updateUserStatus = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { is_active } = req.body;

    if (typeof is_active !== 'boolean') {
      return res.status(400).json({ error: 'Campo is_active deve ser booleano' });
    }

    const user = await userService.updateUserStatus(parseInt(id), is_active);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao atualizar status do usuário' });
  }
};

export const deleteUserController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    await userService.deleteUserService(parseInt(id));
    return res.status(204).send(); // 204 No Content, sucesso sem retorno
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
};

// export const deactivateUser = async (req: Request, res: Response): Promise<Response> => {
//     try {
//         const { id } = req.params;
//         const deactivatedUser = await userService.deactivateUser(parseInt(id));
//         return res.status(200).json(deactivatedUser);
//     } catch (err) {
//         return res.status(500).json({ error: 'Erro ao desativar usuário' });
//     }
// };