const { WebcastPushConnection } = require('tiktok-live-connector');

const share = async (username) => {
    let tiktokLiveConnection = new WebcastPushConnection(username);

    try {
        // Conectar à live do TikTok
        let state = await tiktokLiveConnection.connect();
        console.log(`Conectado à live de ${state.roomInfo.owner.nickname}`);

        // Disparado quando um usuário compartilha a live
        tiktokLiveConnection.on('share', (data) => {
            console.log(data.uniqueId, "Compartilhou a live!");
        })

    } catch (error) {
        console.error('Erro ao conectar à live:', error);
    }
};

module.exports = {
    share
};
