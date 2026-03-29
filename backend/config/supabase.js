const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.SUPABASE_URL,
});

pool.connect()
    .then(() => console.log('Conexión a Supabase exitosa'))
    .catch((err) => console.log('Error al conectar a Supabase:', err.stack));

module.exports = pool;