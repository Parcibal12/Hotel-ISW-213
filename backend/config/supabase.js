import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.SUPABASE_URL,
});

pool.connect()
    .then(() => console.log('Conexión a Supabase exitosa'))
    .catch(err => console.error('Error:', err.stack));

export default pool;