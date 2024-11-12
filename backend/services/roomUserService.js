// services/roomUserService.js
const { WebcastPushConnection } = require('tiktok-live-connector');

const roomUser = async (username, onTopDonorsUpdate) => {
    let tiktokLiveConnection = new WebcastPushConnection(username);

    try {
        // Conectar à live do TikTok
        let state = await tiktokLiveConnection.connect();
        console.log(`Conectado à live de ${state.roomInfo.owner.nickname}`);

        // Ouvir o evento roomUser para pegar os maiores doadores
        tiktokLiveConnection.on('roomUser', data => {
            console.log(`Total de espectadores: ${data.viewerCount}`);

            if (data.topViewers && data.topViewers.length > 0) {
                // Ordena os topViewers por coinCount em ordem decrescente
                const topDonors = data.topViewers.sort((a, b) => b.coinCount - a.coinCount);

                // Pega os primeiros 3 doadores
                const top3Donors = topDonors.slice(0, 3).map((viewer, index) => ({
                    rank: index + 1,
                    uniqueId: viewer.user.uniqueId,
                    coinCount: viewer.coinCount
                }));

                console.log('Top 3 maiores doadores:', top3Donors);

                // Chama o callback com os top 3 doadores
                onTopDonorsUpdate(top3Donors);
            }
        });

        // Caso haja erro na conexão
        tiktokLiveConnection.on('error', (err) => {
            console.error('Erro ao conectar à live:', err);
        });

    } catch (error) {
        console.error('Erro ao conectar à live:', error);
        throw error;
    }
};

module.exports = {
    roomUser
};
