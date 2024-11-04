const { WebcastPushConnection } = require('tiktok-live-connector');

const viewer = async (username) => {
    let tiktokLiveConnection = new WebcastPushConnection(username);

    try {
        // Conectar à live do TikTok
        let state = await tiktokLiveConnection.connect();
        console.log(`Conectado à live de ${state.roomInfo.owner.nickname}`);

          // Ouvir eventos de novos espectadores entrando na live
          tiktokLiveConnection.on('member', data => {
            console.log(`Novo espectador: ${data.uniqueId}`);
        });


    } catch (error) {
        console.error('Erro ao conectar à live:', error);
    }
};

module.exports = {
    viewer
};
