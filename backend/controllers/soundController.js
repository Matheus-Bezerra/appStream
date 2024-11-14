// controllers/soundController.js
const soundService = require('../services/soundService');

exports.getUserSounds = (req, res) => {
    const { sound } = req.query; // Obtém o termo de busca da query string
    if (!sound) {
        return res.status(400).json({ error: 'Por favor, informe uma palavra-chave para a busca.' });
    }

    soundService.searchingSounds(sound)
        .then((sounds) => {
            res.status(200).json({ message: `Busca de som realizada para "${sound}"`, sounds });
        })
        .catch((err) => {
            console.error(`Erro ao buscar som "${sound}":`, err);
            console.log("EEROR---------", err);

            let status;
            if (err == "Error: Erro ao buscar sonsAxiosError: Request failed with status code 404") {
                status = 404
            } else {
                status = 500
            }
            const message = err.response ? err.response.data : `Erro ao buscar som: ${sound}`;

            res.status(status).json({ error: message });
        });
};



exports.getTopSounds = (req, res) => {
    soundService.getTopSounds()
        .then((sounds) => {
            res.status(200).json({ message: 'Top 100 sons', sounds });
        })
        .catch((err) => {
            console.error(`Erro ao buscar os sons:`, err);
            res.status(500).json({ error: 'Erro ao buscar os sons' });
        });
};
