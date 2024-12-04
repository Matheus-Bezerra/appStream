const { WebcastPushConnection } = require('tiktok-live-connector');
const { piscarTela } = require('./webcamService');
const { executarAcaoNoJogo } = require('./actionsMineCraftService');
const { executarTecla } = require('./actionsGtaService');
const { executarTecla2 } = require('./actionsGtaService');
const keySender = require('node-key-sender');


const { getData } = require('./redisService'); // Import the Redis service
const { executeAhk } = require('./ahkService');



const connectToTikTokLive = async (username, game) => {
    let tiktokLiveConnection = new WebcastPushConnection(username);

    try {
        // Retrieve user predefinicoes from Redis
        const predefinicoes = await getData(username);

        if (!predefinicoes) {
            console.error(`No predefinicoes found for user: ${username}`);
            // return;
        }

        console.log(`Loaded predefinicoes for user ${username}:`, predefinicoes);


        if (game === "GTA") {
            const executarahk = await executeAhk(predefinicoes, username)
        }

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
            const matchedPref = predefinicoes.find(
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
            const matchedPref = predefinicoes.find(
                pref => pref.presente === data.comment && pref.modulo === game
            );
            if (matchedPref) {
                console.log(`Action for gift "${matchedPref.presente}":`, matchedPref.acao);

                // Execute based on module and action
                if (matchedPref.modulo === 'GTA' && matchedPref.tecla) {
                    executarTecla(matchedPref.tecla);
                } else if (matchedPref.modulo === 'SnapCamera' && matchedPref.efeito) {
                    console.log("entrei no snapcamera")
                    console.log(`Simulando combinação de teclas para SnapCamera: ${matchedPref.efeito}`);
                    // Divide a combinação em um array (ex.: "Ctrl+F" -> ["control", "f"])
                    const combination = matchedPref.efeito.toLowerCase().split('+');
                    keySender.sendCombination(combination)
                        .then(() => console.log(`Combinação "${matchedPref.efeito}" simulada com sucesso!`))
                        .catch(err => console.error('Erro ao simular a combinação:', err));
                    // piscarTela();
                } else if (matchedPref.modulo === 'Minecraft') {
                    executarAcaoNoJogo(matchedPref.acao, username);
                } else if (matchedPref.modulo === 'GTA' && matchedPref.efeito) {
                    executarTecla2(matchedPref.efeito);

                }
            } else {
                console.log(`Nenhuma ação definida para o presente "${data.comment}" no módulo "${game}".`);

            }
        });


    } catch (error) {
        // stopAhk()
        console.error('Erro ao conectar à live:', error);
    }
};

module.exports = {
    connectToTikTokLive
};
