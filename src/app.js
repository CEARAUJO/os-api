const express = require('express');
const app = express();
require('./config/initDB');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const usuarioRoute = require('./routes/usuarioRoute');
const atividadeRoutes = require('./routes/atividadeRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/ordens', orderRoutes);
app.use('/api/usuarios', usuarioRoute);
app.use('/api/atividade', atividadeRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}...`)
});