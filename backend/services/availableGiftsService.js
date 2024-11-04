const { WebcastPushConnection } = require('tiktok-live-connector');

const getAvailableGifts = async (username) => {
    let tiktokLiveConnection = new WebcastPushConnection(username);

    try {
        // Conectar à live do TikTok
        let state = await tiktokLiveConnection.connect();
        console.log(`Conectado à live de ${state.roomInfo.owner.nickname}`);

        // Pegar todos os presentes disponíveis
        return new Promise((resolve, reject) => {
            tiktokLiveConnection.getAvailableGifts().then(giftList => {
                // Ordenar a lista de presentes por diamond_count
                const sortedGiftList = giftList.sort((a, b) => a.diamond_count - b.diamond_count);

                // Mapear os presentes para retornar as informações necessárias
                const gifts = sortedGiftList.map(gift => ({
                    id: gift.id,
                    name: gift.name,
                    diamond_count: gift.diamond_count,
                    image_urls: gift.image && gift.image.url_list ? gift.image.url_list : []
                }));

                resolve(gifts); // Resolver a promessa com a lista de presentes
            }).catch(err => {
                reject(err); // Rejeitar a promessa em caso de erro
            });
        });

    } catch (error) {
        console.error('Erro ao conectar à live:', error);
        throw error;
    }
};

module.exports = {
    getAvailableGifts
};
