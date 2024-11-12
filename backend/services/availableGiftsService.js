const { WebcastPushConnection } = require('tiktok-live-connector');
const { getGifts, saveGifts } = require('./redisService'); // Importa os serviços Redis

const getAvailableGifts = async (username) => {
    // Primeiro, tenta buscar os presentes no Redis
    const cachedGifts = await getGifts();
    
    // Se houver presentes salvos em cache, retorna-os
    if (cachedGifts) {
        console.log('Gifts obtidos do cache Redis');
        return cachedGifts;
    }

    // Caso contrário, conecta-se à live do TikTok e obtém os presentes
    let tiktokLiveConnection = new WebcastPushConnection(username);

    try {
        // Conectar à live do TikTok
        let state = await tiktokLiveConnection.connect();
        console.log(`Conectado à live de ${state.roomInfo.owner.nickname}`);

        // Pegar todos os presentes disponíveis
        const giftList = await tiktokLiveConnection.getAvailableGifts();
        
        // Ordenar a lista de presentes por diamond_count
        const sortedGiftList = giftList.sort((a, b) => a.diamond_count - b.diamond_count);

        // Mapear os presentes para retornar as informações necessárias
        const gifts = sortedGiftList.map(gift => ({
            id: gift.id,
            name: gift.name,
            diamond_count: gift.diamond_count,
            image_urls: gift.image && gift.image.url_list ? gift.image.url_list : []
        }));

        // Salva a lista de presentes no Redis com expiração de 12 horas
        await saveGifts(gifts);
        console.log('Gifts salvos no Redis');

        return gifts; // Retorna a lista de presentes

    } catch (error) {
        console.error('Erro ao conectar à live:', error);
        throw error;
    }
};

module.exports = {
    getAvailableGifts
};
