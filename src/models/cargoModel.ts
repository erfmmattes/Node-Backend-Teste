import { query } from '../config/database';
import { Cargo } from '../types';

export const create = async (name: string): Promise<Cargo> => {
    const res = await query<Cargo>('INSERT INTO cargos (name) VALUES ($1) RETURNING *', [name]);
    return res.rows[0];
};

export const findAll = async (): Promise<Cargo[]> => {
    const res = await query<Cargo>('SELECT * FROM cargos');
    return res.rows;
};

export const findOne = async (id: number): Promise<Cargo | null> => {
  const res = await query<Cargo>('SELECT * FROM cargos WHERE id = $1', [id]);
  if (res.rows.length === 0) {
    return null;
  }
  return res.rows[0];
};

export const update = async (id: number, name: string): Promise<Cargo> => {
  const res = await query<Cargo>(
    'UPDATE cargos SET name = $1 WHERE id = $2 RETURNING *',
    [name, id]
  );
  return res.rows[0];
};

export const countUsersByCargoId = async (cargoId: number): Promise<number> => {
  const res = await query('SELECT COUNT(*) FROM users WHERE cargo_id = $1', [cargoId]);
  return parseInt(res.rows[0].count, 10);
};

export const deleteOne = async (id: number): Promise<void> => {
  await query('DELETE FROM cargos WHERE id = $1', [id]);
};