import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);

        if (!token) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        return res.status(200).json({ token });
    } catch (err) {
        return res.status(500).json({ error: 'Erro no login' });
    }
};