const { WebcastPushConnection } = require('tiktok-live-connector');

const subscribe = async (username) => {
    let tiktokLiveConnection = new WebcastPushConnection(username);

    try {
        // Conectar à live do TikTok
        let state = await tiktokLiveConnection.connect();
        console.log(`Conectado à live de ${state.roomInfo.owner.nickname}`);

        // Disparado quando um usuário se inscreve (assina) no canal do streamer.
        tiktokLiveConnection.on('subscribe', (data) => {
            console.log(data.uniqueId, "Inscreveu-se!");
        })


    } catch (error) {
        console.error('Erro ao conectar à live:', error);
    }
};

module.exports = {
    subscribe
};
