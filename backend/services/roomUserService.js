const { WebcastPushConnection } = require('tiktok-live-connector');

const roomUser = async (username) => {
    let tiktokLiveConnection = new WebcastPushConnection(username);

    try {
        // Conectar à live do TikTok
        let state = await tiktokLiveConnection.connect();
        console.log(`Conectado à live de ${state.roomInfo.owner.nickname}`);

        return new Promise((resolve, reject) => {
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
                    resolve(top3Donors); // Retorna os top 3 doadores
                } else {
                    resolve([]); // Retorna uma lista vazia caso não haja doadores
                }
            });

            // Caso haja erro na conexão
            tiktokLiveConnection.on('error', (err) => {
                reject('Erro ao conectar à live: ' + err);
            });
        });
    } catch (error) {
        console.error('Erro ao conectar à live:', error);
        throw error;
    }
};

module.exports = {
    roomUser
};
