const express = require('express');
const http = require('http');
const cors = require('cors'); // Importe o CORS
const webcamRoutes = require('./routes/webcamRoutes');
const tiktokRoutes = require('./routes/tiktokRoutes');
const redisRoutes = require('./routes/redisRoutes');
const initializeWebSocket = require('./config/websocketServer');

require('./keyboardListener');

const app = express();
const PORT = process.env.PORT || 3000;

// middleware CORS
app.use(cors({
    // origin: 'http://localhost:5173', // Permitir apenas esta origem
    origin: '*', // Permito todas as origens aqui de requisição
    methods: ['GET', 'POST'], // Permitir esses tipos.
}));


const server = http.createServer(app);

initializeWebSocket(server);

app.use(express.json());

// Rotas da webcam
app.use('/api/webcam', webcamRoutes);

// Rota TikTok
app.use('/tiktok', tiktokRoutes);

// Rota Redis
app.use('/redis', redisRoutes);

// Inicia o servidor HTTP e WebSocket na mesma porta
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
