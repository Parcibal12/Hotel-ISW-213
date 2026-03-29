require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/supabase');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hotel API');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
}); 