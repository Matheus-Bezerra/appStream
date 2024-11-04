const webcamService = require('../services/webcamService');

exports.ligarWebcam = (req, res) => {
    webcamService.ligarWebcam((err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao ligar a webcam' });
        }
        res.status(200).json({ message: 'Webcam ligada com sucesso!', data });
    });
};


exports.piscarTela = (req, res) => {
    webcamService.piscarTela(); // Chama o serviço
    console.log("Piscar tela acionado");
    res.status(200).json({ message: 'Tela piscada com sucesso!' });
};


