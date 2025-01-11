// services/redisService.js
const client = require('../config/redisClient');
const { v4: uuidv4 } = require('uuid'); // Biblioteca para gerar UUIDs


exports.saveData = async (usuario, value) => {
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
exports.getData = async (usuario) => {
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


exports.saveEventos = async (usuario, newData) => {
  console.log("CHEGUEI NA SAVEDATA");
  const key = `preDefinicaoUsuario:${newData.id}`;
  console.log("CHEGUEI NA key", key);

  if (!client.isOpen) {
    await client.connect();
    await client.select(1);
  }

  try {
    // Busca dados existentes no Redis
    const existingData = await client.get(key);
    let updatedData;

    if (existingData) {
      console.log("Dados existentes encontrados, processando atualização...");
      const parsedData = JSON.parse(existingData);

      if (parsedData.id === newData.id && parsedData.nome === newData.nome) {
        // Substituir eventos existentes com o mesmo ID ou adicionar novos
        console.log("Atualizando eventos existentes...");
        const updatedEvents = parsedData.eventos.map(existingEvent => {
          const newEvent = newData.eventos.find(evento => evento.id === existingEvent.id);
          return newEvent || existingEvent;
        });

        // Adiciona novos eventos que não existiam anteriormente
        const newEvents = newData.eventos.filter(
          evento => !parsedData.eventos.some(existing => existing.id === evento.id)
        );

        // Atualizar objeto com eventos mesclados e substituídos
        updatedData = {
          ...parsedData,
          eventos: [...updatedEvents, ...newEvents],
        };
      } else {
        // Substituir completamente o objeto se `id` ou `nome` forem diferentes
        console.log("ID ou Nome diferentes, substituindo dados...");
        updatedData = newData;
      }
    } else {
      // Se não houver dados no Redis, salva o novo diretamente
      console.log("Nenhum dado encontrado, salvando novo...");
      updatedData = newData;
    }

    // Salva os dados atualizados no Redis
    const reply = await client.set(key, JSON.stringify(updatedData));
    console.log("Dados salvos no Redis com sucesso:", reply);
    return reply;
  } catch (err) {
    console.error("Erro ao salvar no Redis:", err);
    throw err; // Lança erro para tratamento posterior
  }
};


exports.getEventos = async (usuario) => {
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



exports.saveGifts = async (value) => {
  console.log("CHEGUEI NA saveGifts");
  const key = `availableGift`;

  if (!client.isOpen) {
    await client.connect();
    await client.select(2); // Seleciona o banco de dados Redis 2
  }

  try {
    // Define o valor com expiração de 12 horas ou 24hrs  (43200 segundos / 86400)
    const reply = await client.set(key, JSON.stringify(value), 'EX', 86400);
    console.log("Resposta do Redis:", reply);
    return reply;
  } catch (err) {
    console.error("Erro ao salvar no Redis:", err);
    throw err;
  }
};

exports.getGifts = async () => {
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


exports.saveSounds = async (value) => {
  console.log("CHEGUEI NA availableSounds");
  const key = `availableSounds`;

  if (!client.isOpen) {
    await client.connect();
    await client.select(3); // Seleciona o banco de dados Redis 2
  }

  try {
    const reply = await client.set(key, JSON.stringify(value), 'EX', 172800);
    console.log("Resposta do Redis:", reply);
    return reply;
  } catch (err) {
    console.error("Erro ao salvar no Redis:", err);
    throw err;
  }
};

exports.getSounds = async () => {
  const key = `availableSounds`;
  console.log("key", key);

  if (!client.isOpen) {
    await client.connect();
    await client.select(3);
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


exports.saveEffects = async (value) => {
  console.log("CHEGUEI NA availableEffects", value);
  console.log("CHEGUEI No efeitos");
  const key = `availableEffects`;

  if (!client.isOpen) {
    await client.connect();
    await client.select(4);
  }

  try {
    const reply = await client.set(key, JSON.stringify(value));
    console.log("Resposta do Redis:", reply);
    return reply;
  } catch (err) {
    console.error("Erro ao salvar no Redis:", err);
    throw err;
  }
};

exports.getEffects = async () => {
  const key = `availableEffects`;
  console.log("key", key);

  if (!client.isOpen) {
    await client.connect();
    await client.select(4);
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


exports.savePredefinicao = async (usuario, predefinicao) => {
  const key = `predefinicoes:${usuario}`; // Chave única para o usuário

  if (!client.isOpen) {
    await client.connect();
    await client.select(1); // Seleciona o banco no Redis
  }

  try {
    // Busca predefinições existentes para o usuário
    const existingData = await client.get(key);
    let updatedData;

    if (existingData) {
      console.log(`Predefinições existentes encontradas para o usuário ${usuario}`);
      const parsedData = JSON.parse(existingData);

      // Verifica se já existe uma predefinição com o mesmo nome
      const duplicate = parsedData.some(predef => predef.nome === predefinicao.nome);
      if (duplicate) {
        throw new Error(`O usuário ${usuario} já possui uma predefinição com o nome "${predefinicao.nome}".`);
      }

      // Atualiza todas as predefinições existentes para `ativo: false`
      const updatedExistingData = parsedData.map(predef => ({
        ...predef,
        ativo: false,
      }));

      // Adiciona a nova predefinição com `ativo: true`
      const newPredefinicao = {
        id: uuidv4(), // Gera um novo ID único
        nome: predefinicao.nome,
        ativo: true,
      };

      // Mescla os dados atualizados com a nova predefinição
      updatedData = [...updatedExistingData, newPredefinicao];
    } else {
      console.log(`Nenhuma predefinição encontrada para o usuário ${usuario}. Criando nova...`);

      // Cria o array com a primeira predefinição
      updatedData = [
        {
          id: uuidv4(),
          nome: predefinicao.nome,
          ativo: true, // Nova predefinição é automaticamente ativa
        },
      ];
    }

    // Salva as predefinições atualizadas no Redis
    await client.set(key, JSON.stringify(updatedData));
    console.log("Predefinições salvas com sucesso.");
    return updatedData;
  } catch (err) {
    console.error("Erro ao salvar predefinições no Redis:", err);
    throw err;
  }
};



exports.getPredefinicoes = async (usuario) => {
  const key = `predefinicoes:${usuario}`;

  if (!client.isOpen) {
    await client.connect();
    await client.select(1);
  }

  try {
    const data = await client.get(key);
    return data ? JSON.parse(data) : []; // Retorna o array de predefinições ou vazio
  } catch (err) {
    console.error("Erro ao buscar predefinições no Redis:", err);
    throw err;
  }
};


exports.deleteTodasPredefinicoes = async (usuario) => {
  const key = `predefinicoes:${usuario}`;

  if (!client.isOpen) {
    await client.connect();
    await client.select(1);
  }

  try {
    const exists = await client.exists(key); // Verifica se a chave existe no Redis
    if (!exists) {
      console.log(`Nenhuma predefinição encontrada para o usuário ${usuario}.`);
      return false; // Retorna false se não houver dados
    }

    await client.del(key); // Deleta a chave inteira
    console.log(`Todas as predefinições para o usuário ${usuario} foram removidas.`);
    return true;
  } catch (err) {
    console.error("Erro ao deletar predefinições no Redis:", err);
    throw err;
  }
};

exports.deletePredefinicao = async (usuario, id) => {
  const key = `predefinicoes:${usuario}`;

  if (!client.isOpen) {
    await client.connect();
    await client.select(1);
  }

  try {
    const data = await client.get(key);
    if (!data) {
      console.log(`Nenhuma predefinição encontrada para o usuário ${usuario}.`);
      return false; // Retorna false se não houver dados
    }

    const parsedData = JSON.parse(data);
    const updatedData = parsedData.filter(predef => predef.id !== id); // Remove a predefinição pelo ID

    if (updatedData.length === parsedData.length) {
      console.log(`Nenhuma predefinição com o ID ${id} encontrada para o usuário ${usuario}.`);
      return false; // Retorna false se não encontrou o ID
    }

    await client.set(key, JSON.stringify(updatedData)); // Salva os dados atualizados
    console.log(`Predefinição com o ID ${id} foi removida para o usuário ${usuario}.`);
    return true;
  } catch (err) {
    console.error("Erro ao deletar predefinição no Redis:", err);
    throw err;
  }
};

exports.tornarAtiva = async (usuario, id) => {
  const key = `predefinicoes:${usuario}`;

  if (!client.isOpen) {
      await client.connect();
      await client.select(1);
  }

  try {
      const data = await client.get(key);
      if (!data) return false;

      const parsedData = JSON.parse(data);
      let found = false;

      const updatedData = parsedData.map(predef => {
          if (predef.id === id) {
              found = true;
              return { ...predef, ativo: true };
          }
          return { ...predef, ativo: false };
      });

      if (!found) return false;

      await client.set(key, JSON.stringify(updatedData));
      return true;
  } catch (err) {
      console.error("Erro ao atualizar predefinição ativa no Redis:", err);
      throw err;
  }
};



exports.renomearPredefinicao = async (usuario, id, nome) => {
  const key = `predefinicoes:${usuario}`;

  if (!client.isOpen) {
      await client.connect();
      await client.select(1);
  }

  try {
      const data = await client.get(key);
      if (!data) return false;

      const parsedData = JSON.parse(data);
      let found = false;

      const updatedData = parsedData.map(predef => {
          if (predef.id === id) {
              found = true;
              return { ...predef, nome };
          }
          return predef;
      });

      if (!found) return false;

      await client.set(key, JSON.stringify(updatedData));
      return true;
  } catch (err) {
      console.error("Erro ao renomear predefinição no Redis:", err);
      throw err;
  }
};
