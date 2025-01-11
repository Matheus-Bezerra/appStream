const redisService = require('../services/redisService');

exports.saveUserPreferences = async (req, res) => {
    console.log("req bodyyy ----------> ", req.body)
    try {
        const { usuario, predefinicoes } = req.body;
        console.log("ENTREI")
        await redisService.saveData(usuario, predefinicoes);
        console.log('Preferências salvas com sucesso!'); // Log para verificar o fluxo

        res.status(200).json({ message: 'Preferências salvas com sucesso!' });
    } catch (error) {
        console.error('Erro ao salvar preferências:', error);
        res.status(500).json({ error: 'Erro ao salvar preferências' });
    }
};


exports.getUserPreferences = async (req, res) => {
    const { usuario } = req.body; // Captura o usuário da URL
    try {
        const predefinicoes = await redisService.getData(usuario); // Chama a função de busca
        if (predefinicoes) {
            res.status(200).json(predefinicoes); // Retorna as preferências encontradas
        } else {
            res.status(404).json({ message: 'Preferências não encontradas' }); // Se não encontrar, retorna 404
        }
    } catch (error) {
        console.error("Erro ao buscar preferências:", error);
        res.status(500).json({ error: 'Erro ao buscar preferências' });
    }
};




exports.saveEventos = async (req, res) => {
    console.log("req bodyyy ----------> ", req.body);
    try {
        const { usuario, ...data } = req.body; // Captura o usuário e os dados
        console.log("ENTREI");

        await redisService.saveEventos(usuario, data);
        console.log('Preferências salvas com sucesso!');

        res.status(200).json({ message: 'Preferências salvas com sucesso!' });
    } catch (error) {
        console.error('Erro ao salvar preferências:', error);
        res.status(500).json({ error: 'Erro ao salvar preferências' });
    }
};


exports.getEventos = async (req, res) => {
    const { usuario } = req.body; // Captura o usuário da URL
    try {
        const eventos = await redisService.getEventos(usuario); // Chama a função de busca
        if (eventos) {
            res.status(200).json(eventos); // Retorna as preferências encontradas
        } else {
            res.status(404).json({ message: 'Preferências não encontradas' }); // Se não encontrar, retorna 404
        }
    } catch (error) {
        console.error("Erro ao buscar preferências:", error);
        res.status(500).json({ error: 'Erro ao buscar preferências' });
    }
};


exports.saveGiftAvailable = async (req, res) => {
    try {
        console.log("ENTREI")
        await redisService.saveGifts();
        console.log('gift salvas com sucesso!'); // Log para verificar o fluxo

        res.status(200).json({ message: 'gift salvo com sucesso!' });
    } catch (error) {
        console.error('Erro ao salvar preferências:', error);
        res.status(500).json({ error: 'Erro ao salvar preferências' });
    }
};

exports.getGiftAvailable = async (req, res) => {
    try {
        const giftList = await redisService.getGifts(); // Chama a função de busca
        if (giftList) {
            res.status(200).json(giftList); // Retorna as preferências encontradas
        } else {
            res.status(404).json({ message: 'Preferências não encontradas' }); // Se não encontrar, retorna 404
        }
    } catch (error) {
        console.error("Erro ao buscar preferências:", error);
        res.status(500).json({ error: 'Erro ao buscar preferências' });
    }
};


exports.saveSounds = async (req, res) => {
    try {
        console.log("ENTREI")
        await redisService.saveSounds();
        console.log('gift salvas com sucesso!'); // Log para verificar o fluxo

        res.status(200).json({ message: 'gift salvo com sucesso!' });
    } catch (error) {
        console.error('Erro ao salvar preferências:', error);
        res.status(500).json({ error: 'Erro ao salvar preferências' });
    }
};

exports.getSounds = async (req, res) => {
    try {
        const soundtList = await redisService.getSounds(); // Chama a função de busca
        if (soundtList) {
            res.status(200).json(soundtList); // Retorna as preferências encontradas
        } else {
            res.status(404).json({ message: 'Preferências não encontradas' }); // Se não encontrar, retorna 404
        }
    } catch (error) {
        console.error("Erro ao buscar preferências:", error);
        res.status(500).json({ error: 'Erro ao buscar preferências' });
    }
};



exports.saveEffects = async (req, res) => {
    try {
        console.log("ENTREI");
        const value = req.body; // Pegue os dados do corpo da requisição
        if (!value) {
            return res.status(400).json({ error: "Dados inválidos ou ausentes no corpo da requisição" });
        }

        await redisService.saveEffects(value); // Passe os dados para o serviço
        console.log('Efeitos salvos com sucesso!');

        res.status(200).json({ message: 'Efeito salvo com sucesso!' });
    } catch (error) {
        console.error('Erro ao salvar preferências:', error);
        res.status(500).json({ error: 'Erro ao salvar preferências' });
    }
};


exports.getEffects = async (req, res) => {
    try {
        const effectsList = await redisService.getEffects(); // Chama a função de busca
        if (effectsList) {
            res.status(200).json(effectsList); // Retorna as preferências encontradas
        } else {
            res.status(404).json({ message: 'Preferências não encontradas' }); // Se não encontrar, retorna 404
        }
    } catch (error) {
        console.error("Erro ao buscar preferências:", error);
        res.status(500).json({ error: 'Erro ao buscar preferências' });
    }
};


exports.savePredefinicao = async (req, res) => {
    const { usuario, nome } = req.body;

    if (!usuario || !nome) {
        return res.status(400).json({ error: 'Usuário e nome da predefinição são obrigatórios.' });
    }

    try {
        const predefinicao = { nome }; // Dados da predefinição enviados
        const data = await redisService.savePredefinicao(usuario, predefinicao);
        res.status(200).json(data); // Retorna as predefinições atualizadas
    } catch (error) {
        console.error("Erro ao salvar predefinições:", error);

        // Verifica se o erro é relacionado a nomes duplicados
        if (error.message.includes("já possui uma predefinição")) {
            return res.status(400).json({ error: error.message });
        }

        res.status(500).json({ error: 'Erro ao salvar predefinições.' });
    }
};


exports.getPredefinicao = async (req, res) => {
    const { nome } = req.params; // Captura o nome enviado como parâmetro da URL

    if (!nome) {
        return res.status(400).json({ error: 'Nome é obrigatório' });
    }

    try {
        const id = await redisService.getPredefinicoes(nome);
        if (id) {
            res.status(200).json({ predefinicoes: id });
        } else {
            res.status(404).json({ message: 'ID não encontrado para o nome fornecido' });
        }
    } catch (error) {
        console.error("Erro ao buscar ID por nome:", error);
        res.status(500).json({ error: 'Erro ao buscar ID' });
    }
};

exports.deleteTodasPredefinicoes = async (req, res) => {
    const { usuario } = req.params; // Captura o usuário da URL

    if (!usuario) {
        return res.status(400).json({ error: 'Usuário é obrigatório.' });
    }

    try {
        const result = await redisService.deleteTodasPredefinicoes(usuario);
        if (result) {
            res.status(200).json({ message: `Todas as predefinições do usuário ${usuario} foram removidas.` });
        } else {
            res.status(404).json({ message: `Nenhuma predefinição encontrada para o usuário ${usuario}.` });
        }
    } catch (error) {
        console.error("Erro ao deletar predefinições:", error);
        res.status(500).json({ error: 'Erro ao deletar predefinições.' });
    }
};



exports.deletePredefinicao = async (req, res) => {
    const { usuario, id } = req.params; // Captura o usuário e o ID da URL

    if (!usuario || !id) {
        return res.status(400).json({ error: 'Usuário e ID da predefinição são obrigatórios.' });
    }

    try {
        const result = await redisService.deletePredefinicao(usuario, id);
        if (result) {
            res.status(200).json({ message: `Predefinição com o ID ${id} foi removida para o usuário ${usuario}.` });
        } else {
            res.status(404).json({ message: `Predefinição com o ID ${id} não encontrada para o usuário ${usuario}.` });
        }
    } catch (error) {
        console.error("Erro ao deletar predefinição:", error);
        res.status(500).json({ error: 'Erro ao deletar predefinição.' });
    }
};


exports.tornarAtiva = async (req, res) => {
    const { usuario, id } = req.params;

    if (!usuario || !id) {
        return res.status(400).json({ error: 'Usuário e ID da predefinição são obrigatórios.' });
    }

    try {
        const result = await redisService.tornarAtiva(usuario, id);
        if (result) {
            res.status(200).json({ message: `Predefinição com o ID ${id} foi marcada como ativa.` });
        } else {
            res.status(404).json({ error: `Predefinição com o ID ${id} não encontrada para o usuário ${usuario}.` });
        }
    } catch (error) {
        console.error("Erro ao atualizar predefinição ativa:", error);
        res.status(500).json({ error: 'Erro ao atualizar predefinição ativa.' });
    }
};



exports.renomearPredefinicao = async (req, res) => {
    const { usuario, id } = req.params;
    const { nome } = req.body;

    if (!usuario || !id || !nome) {
        return res.status(400).json({ error: 'Usuário, ID da predefinição e novo nome são obrigatórios.' });
    }

    try {
        const result = await redisService.renomearPredefinicao(usuario, id, nome);
        if (result) {
            res.status(200).json({ message: `Predefinição com o ID ${id} foi renomeada para "${nome}".` });
        } else {
            res.status(404).json({ error: `Predefinição com o ID ${id} não encontrada para o usuário ${usuario}.` });
        }
    } catch (error) {
        console.error("Erro ao renomear predefinição:", error);
        res.status(500).json({ error: 'Erro ao renomear predefinição.' });
    }
};
