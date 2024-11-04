const NodeWebcam = require('node-webcam');
const path = require('path');
const WebSocket = require('ws');
// Cria um servidor WebSocket na porta 8080
const wss = new WebSocket.Server({ port: 8080 });


wss.on('connection', (ws) => {
    console.log('Cliente conectado ao WebSocket');
});

const webcamOptions = {
    width: 1280,
    height: 720,
    quality: 100,
    delay: 0,
    saveShots: true,
    output: 'jpeg',
    device: false,
    callbackReturn: 'location',
    verbose: false
};

const ligarWebcam = () => {
    const Webcam = NodeWebcam.create(webcamOptions);

    // Define o caminho para salvar a imagem, com tratamento para espaços
    const savePath = path.join(__dirname, '..', 'images', 'webcam.jpg');
    const safePath = `"${savePath}"`;  // Envolve o caminho em aspas duplas

    Webcam.capture(safePath, (err, data) => {
        if (err) {
            console.error('Erro ao capturar a imagem da webcam:', err);
        } else {
            console.log('Imagem capturada e salva em:', data);
        }
    });
};

const piscarTela = () => {
    console.log("chamado")
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ action: 'blink' }));
        }
    });
}

module.exports = { ligarWebcam, piscarTela };
