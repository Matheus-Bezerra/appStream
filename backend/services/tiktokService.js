const { WebcastPushConnection } = require('tiktok-live-connector');
const { piscarTela } = require('./webcamService');
const { executarAcaoNoJogo } = require('./actionsMineCraftService');
const { executarTecla } = require('./actionsGtaService');
const { getData } = require('./redisService'); // Import the Redis service

const connectToTikTokLive = async (username, game) => {
    let tiktokLiveConnection = new WebcastPushConnection(username);

    try {
        // Retrieve user preferences from Redis
        const preferences = await getData(username);

        if (!preferences) {
            console.error(`No preferences found for user: ${username}`);
            // return;
        }

        console.log(`Loaded preferences for user ${username}:`, preferences);

        // Connect to the TikTok live stream
        let state = await tiktokLiveConnection.connect();
        try {
            console.log(`Connected to ${state.roomInfo.owner.nickname}'s live stream`);
        } catch (error) {

        }

        // Listen for gift events
        tiktokLiveConnection.on('gift', data => {
            console.log(`${data.uniqueId} sent gift: ${data.giftName} (Quantity: ${data.repeatCount})`);

            // Encontrar preferência que corresponda ao presente e ao jogo especificado
            const matchedPref = preferences.find(
                pref => pref.presente === data.giftName && pref.modulo === game
            );

            if (matchedPref) {
                console.log(`Action for gift "${matchedPref.presente}":`, matchedPref.acao);

                // Execute based on module and action
                if (matchedPref.modulo === 'GTA' && matchedPref.tecla) {
                    executarTecla(matchedPref.tecla);
                } else if (matchedPref.modulo === 'webcam') {
                    piscarTela();
                } else if (matchedPref.modulo === 'Minecraft') {
                    executarAcaoNoJogo(matchedPref.acao, username);
                }
            }
        });

        // Ouvir eventos de mensagens no chat
        tiktokLiveConnection.on('chat', data => {
            console.log(`${data.uniqueId} disse: ${data.comment}`);
            // Encontrar preferência que corresponda ao presente e ao jogo especificado
            const matchedPref = preferences.find(
                pref => pref.presente === data.comment && pref.modulo === game
            );
            if (matchedPref) {
                console.log(`Action for gift "${matchedPref.presente}":`, matchedPref.acao);

                // Execute based on module and action
                if (matchedPref.modulo === 'GTA' && matchedPref.tecla) {
                    executarTecla(matchedPref.tecla);
                } else if (matchedPref.modulo === 'webcam') {
                    piscarTela();
                } else if (matchedPref.modulo === 'Minecraft') {
                    executarAcaoNoJogo(matchedPref.acao, username);
                }
            } else {
                console.log(`Nenhuma ação definida para o presente "${data.comment}" no módulo "${game}".`);

            }
        });


    } catch (error) {
        console.error('Erro ao conectar à live:', error);
    }
};

module.exports = {
    connectToTikTokLive
};
