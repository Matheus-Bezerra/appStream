const express = require('express');
const http = require('http'); // Importa o módulo HTTP para criar um servidor
const webcamRoutes = require('./routes/webcamRoutes');
const tiktokRoutes = require('./routes/tiktokRoutes');
const redisRoutes = require('./routes/redisRoutes');
const initializeWebSocket = require('./config/websocketServer'); // Importe o WebSocket Server

require('./keyboardListener');  // Ativa o listener de teclado

const app = express();
const PORT = process.env.PORT || 3000;

// Cria o servidor HTTP com o Express
const server = http.createServer(app);

// Inicializa o WebSocket com o servidor HTTP
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
