// config/redisClient.js
const { createClient } = require('redis');

const client = createClient({
  url: 'redis://localhost:6379' // ajuste a URL se necessário
});

client.on('error', (err) => console.error('Redis Client Error', err));

// Conecta o cliente Redis imediatamente e seleciona o banco de dados
async function initializeRedisClient() {
  if (!client.isOpen) {
    await client.connect(); // Conecta o cliente Redis
    await client.select(1); // Seleciona o banco de dados Redis 1
    console.log("Redis conectado e banco de dados 1 selecionado");
  }
}

initializeRedisClient();

module.exports = client;
