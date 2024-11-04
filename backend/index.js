const express = require('express');
const webcamRoutes = require('./routes/webcamRoutes');
const tiktokRoutes = require('./routes/tiktokRoutes');
const redisRoutes = require('./routes/redisRoutes');

require('./keyboardListener');  // Ativa o listener de teclado

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rotas da webcam
app.use('/api/webcam', webcamRoutes);

// Rota tikTok
app.use('/tiktok', tiktokRoutes);


// Rota redis
app.use('/redis', redisRoutes);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
