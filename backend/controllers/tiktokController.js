const tiktokService = require('../services/tiktokService');
const availableGiftsService = require('../services/availableGiftsService');
const roomUserService = require('../services/roomUserService');
const viewerService = require('../services/viewerService');
const subscribeService = require('../services/subscribeService');
const shareService = require('../services/shareService');




// Função do controlador para conectar à live do TikTok
exports.connectToTikTokLive = (req, res) => {
    const { username } = req.body; // Pega o nome de usuário a partir do corpo da requisição
    const { game } = req.body
    console.log("jogo", game)
    // Chama o serviço para conectar à live
    tiktokService.connectToTikTokLive(username, game)
        .then(() => {
            res.status(200).json({ message: `Conexão feita com sucesso com live ${username}` });
        })
        .catch((err) => {
            console.error('Erro ao conectar à live:', err);
            res.status(500).json({ error: 'Erro ao conectar à live' });
        });
};


exports.getAvailableGifts = (req, res) => {
    const { username } = req.body; // Pega o nome de usuário a partir do corpo da requisição
    const { game } = req.body
    console.log("jogo", game)
    // Chama o serviço para conectar à live e pegar os presentes disponíveis
    availableGiftsService.getAvailableGifts(username, game)
        .then((gifts) => {
            res.status(200).json({
                message: `Conexão feita com sucesso com a live de ${username}`,
                availableGifts: gifts // Envia a lista de presentes na resposta
            });
        })
        .catch((err) => {
            console.error('Erro ao conectar à live:', err);
            res.status(500).json({ error: 'Erro ao conectar à live' });
        });
};


exports.roomUser = (req, res) => {
    const { username } = req.body; // Pega o nome de usuário a partir do corpo da requisição

    // Chama o serviço para conectar à live e pegar os top 3 doadores
    roomUserService.roomUser(username)
        .then((top3Donors) => {
            res.status(200).json({
                message: `Conexão feita com sucesso com a live de ${username}`,
                top3Donors: top3Donors // Envia os top 3 doadores na resposta
            });
        })
        .catch((err) => {
            console.error('Erro ao conectar à live:', err);
            res.status(500).json({ error: 'Erro ao conectar à live' });
        });
};


exports.viewer = (req, res) => {
    const { username } = req.body; // Pega o nome de usuário a partir do corpo da requisição

    // Chama o serviço para conectar à live
    viewerService.viewer(username)
        .then(() => {
            res.status(200).json({ message: `Conexão feita com sucesso com live ${username}` });
        })
        .catch((err) => {
            console.error('Erro ao conectar à live:', err);
            res.status(500).json({ error: 'Erro ao conectar à live' });
        });
};


exports.subscribe = (req, res) => {
    const { username } = req.body; // Pega o nome de usuário a partir do corpo da requisição

    // Chama o serviço para conectar à live
    subscribeService.subscribe(username)
        .then(() => {
            res.status(200).json({ message: `Conexão feita com sucesso com live ${username}` });
        })
        .catch((err) => {
            console.error('Erro ao conectar à live:', err);
            res.status(500).json({ error: 'Erro ao conectar à live' });
        });
};


exports.share = (req, res) => {
    const { username } = req.body; // Pega o nome de usuário a partir do corpo da requisição

    // Chama o serviço para conectar à live
    shareService.share(username)
        .then(() => {
            res.status(200).json({ message: `Conexão feita com sucesso com live ${username}` });
        })
        .catch((err) => {
            console.error('Erro ao conectar à live:', err);
            res.status(500).json({ error: 'Erro ao conectar à live' });
        });
};