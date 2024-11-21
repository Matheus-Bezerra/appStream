// config/websocketServer.js
const WebSocket = require('ws');
const roomUserService = require('../services/roomUserService');

const initializeWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('Cliente conectado ao WebSocket');

        ws.on('message', (message) => {
            const { username } = JSON.parse(message);

            try {
                // Inicia o monitoramento em tempo real dos doadores
                roomUserService.roomUser(username, (top3Donors) => {
                    ws.send(JSON.stringify({ top3Donors }));
                });
            } catch (err) {
                console.error('Erro ao monitorar a live:', err);
            }
        });

        ws.on('close', () => {
            console.log('Cliente desconectado do WebSocket');
        });
    });

    return wss;
};

module.exports = initializeWebSocket;
