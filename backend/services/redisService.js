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
const getData = (usuario) => {
  const key = `preDefinicaoUsuario:${usuario}`;
  return new Promise((resolve, reject) => {
    client.get(key, (err, reply) => {
      if (err) return reject(err);
      resolve(JSON.parse(reply));
    });
  });
};

module.exports = {
  saveData,
  getData
};
