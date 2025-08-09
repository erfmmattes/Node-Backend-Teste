import { Pool, QueryResult, QueryResultRow } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432', 10),
});

export const query = <T extends QueryResultRow>(text: string, params?: any[]): Promise<QueryResult<T>> => {
    return pool.query(text, params) as Promise<QueryResult<T>>;
};

export const connectDb = async () => {
    let client;
    try {
        client = await pool.connect();
        await client.query('SELECT NOW()'); 
        console.log('Conexão com o banco de dados PostgreSQL estabelecida com sucesso!');
    } catch (err) {
        console.error('Erro ao conectar com o banco de dados:', err);
        process.exit(1); 
    } finally {
        if (client) {
            client.release(); 
        }
    }
};