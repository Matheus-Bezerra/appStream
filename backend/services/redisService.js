// services/redisService.js
const client = require('../config/redisClient');

const saveData = async (usuario, value) => {
  console.log("CHEGUEI NA SAVEDATA");
  const key = `preDefinicaoUsuario:${usuario}`;
  console.log("CHEGUEI NA key", key);

  if (!client.isOpen) {
    await client.connect();
    await client.select(1);
  }

  console.log(" aqui?");
  try {
    const reply = await client.set(key, JSON.stringify(value));
    console.log("Resposta do Redis:", reply); // Log da resposta
    return reply;
  } catch (err) {
    console.error("Erro ao salvar no Redis:", err);
    throw err; // Lançar erro para tratamento posterior
  }
};


// Função para buscar dados no Redis usando a chave personalizada
const getData = async (usuario) => {
  const key = `preDefinicaoUsuario:${usuario}`;
  console.log("key", key);

  if (!client.isOpen) {
    await client.connect();
    await client.select(1);
  }

  try {
    const reply = await client.get(key);
    console.log("Resposta do Redis buscar:", reply); 
    return reply ? JSON.parse(reply) : null; 
  } catch (err) {
    console.error("Erro ao buscar no Redis:", err);
    throw err; 
  }
}

const saveGifts = async (value) => {
  console.log("CHEGUEI NA saveGifts");
  const key = `availableGift`;

  if (!client.isOpen) {
    await client.connect();
    await client.select(2); // Seleciona o banco de dados Redis 2
  }

  try {
    // Define o valor com expiração de 12 horas (43200 segundos)
    const reply = await client.set(key, JSON.stringify(value), 'EX', 43200);
    console.log("Resposta do Redis:", reply); 
    return reply;
  } catch (err) {
    console.error("Erro ao salvar no Redis:", err);
    throw err; 
  }
};

const getGifts = async () => {
  const key = `availableGift`;
  console.log("key", key);

  if (!client.isOpen) {
    await client.connect();
    await client.select(2); // Seleciona o banco de dados Redis 2
  }

  try {
    const reply = await client.get(key);
    // console.log("Resposta do Redis buscar:", reply); 
    return reply ? JSON.parse(reply) : null; 
  } catch (err) {
    console.error("Erro ao buscar no Redis:", err);
    throw err; 
  }
}

module.exports = {
  saveData,
  getData,
  saveGifts,
  getGifts
};
