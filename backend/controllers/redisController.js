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

exports.savePredefinicao = async (req, res) => {
    console.log("req bodyyy ----------> ", req.body);
    try {
        const { usuario, ...data } = req.body; // Captura o usuário e os dados
        console.log("ENTREI");

        await redisService.savePredefinicao(usuario, data);
        console.log('Preferências salvas com sucesso!');

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




  