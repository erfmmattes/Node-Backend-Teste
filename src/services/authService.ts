import * as userModel from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../types';

export const login = async (email: string, password: string): Promise<string | null> => {
    const user = await userModel.findByEmail(email);

    if (!user || !user.is_active) {
        return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password!);

    if (!passwordMatch) {
        return null;
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, cargo_id: user.cargo_id },
        process.env.JWT_SECRET as string,
        { expiresIn: '60m' }
    );

    return token;
};