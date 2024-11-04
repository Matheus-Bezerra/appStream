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
    try {
        const { usuario } = req.params;
        const preferences = await redisService.getData(usuario);
        res.status(200).json(preferences);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar preferências' });
    }
};

