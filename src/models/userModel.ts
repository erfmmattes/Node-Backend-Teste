import { query } from '../config/database';
import { User } from '../types';

export const create = async (name: string, email: string, password: string, cargo_id: number): Promise<User> => {
    const res = await query<User>(
        'INSERT INTO users (name, email, password, cargo_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, email, password, cargo_id]
    );
    return res.rows[0];
};

export const findByEmail = async (email: string): Promise<User | null> => {
    const res = await query<User>('SELECT * FROM users WHERE email = $1', [email]);
    return res.rows[0] || null;
};

export const findAllWithCargo = async (): Promise<any[]> => {
    const res = await query(
        'SELECT u.id, u.name, u.email, u.is_active, u.created_at, c.name as cargo_name FROM users u JOIN cargos c ON u.cargo_id = c.id'
    );
    return res.rows;
};

export const findByIdWithCargo = async (id: number): Promise<any | null> => {
  const res = await query(
    `SELECT u.id, u.name, u.email, u.is_active, u.created_at, c.id as cargo_id, c.name as cargo_name
     FROM users u
     JOIN cargos c ON u.cargo_id = c.id
     WHERE u.id = $1`,
    [id]
  );

  if (res.rows.length === 0) {
    return null;
  }

  return res.rows[0];
};

export const update = async (id: number, name: string, email: string, cargo_id: number): Promise<User> => {
    const res = await query<User>(
        'UPDATE users SET name = $1, email = $2, cargo_id = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
        [name, email, cargo_id, id]
    );
    return res.rows[0];
};

export const updateStatus = async (id: number, isActive: boolean): Promise<User> => {
  const res = await query<User>(
    'UPDATE users SET is_active = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
    [isActive, id]
  );
  return res.rows[0];
};

export const deleteUser = async (id: number): Promise<void> => {
  await query(
    'DELETE FROM users WHERE id = $1',
    [id]
  );
};

// export const deactivate = async (id: number): Promise<User> => {
//     const res = await query<User>('UPDATE users SET is_active = FALSE, updated_at = NOW() WHERE id = $1 RETURNING *', [id]);
//     return res.rows[0];
// };