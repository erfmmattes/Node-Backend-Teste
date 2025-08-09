import { Request } from 'express';

export interface Cargo {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  cargo_id: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    cargo_id: number;
  };
}