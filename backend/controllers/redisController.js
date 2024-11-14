const redisService = require('../services/redisService');

exports.saveUserPreferences = async (req, res) => {
    console.log("req bodyyy ----------> ", req.body)
    try {
        const { usuario, preferences } = req.body;
        console.log("ENTREI")
        await redisService.saveData(usuario, preferences);
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
        const preferences = await redisService.getData(usuario); // Chama a função de busca
        if (preferences) {
            res.status(200).json(preferences); // Retorna as preferências encontradas
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


