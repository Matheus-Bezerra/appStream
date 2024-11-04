const { WebcastPushConnection } = require('tiktok-live-connector');
const { piscarTela } = require('./webcamService'); 
const { executarAcaoNoJogo } = require('./actionsMineCraftService'); 
const { executarTecla } = require('./actionsGtaService'); 

const connectToTikTokLive = async (username) => {
    let tiktokLiveConnection = new WebcastPushConnection(username);

    try {
        // Conectar à live do TikTok
        let state = await tiktokLiveConnection.connect();
        console.log(`Conectado à live de ${state.roomInfo.owner.nickname}`);


        // Ouvir eventos de presentes enviados
        tiktokLiveConnection.on('gift', data => {
            console.log(`${data.uniqueId} enviou o presente: ${data.giftName} (Quantidade: ${data.repeatCount})`);
            if (data.giftName === "Rose") {
                console.log("------------------ROSA CHAMADAAAAAAAA--------")
                // piscarTela();

            }
        });


        // Ouvir eventos de mensagens no chat
        tiktokLiveConnection.on('chat', data => {
            console.log(`${data.uniqueId} disse: ${data.comment}`);
            if (data.comment === "safa" || data.comment === "top" || data.comment === "10") {
                console.log("cai no safaaaaaaaaaaaaaaaaaaaa")
                executarAcaoNoJogo('safa');

                // piscarTela();

                if (data.comment == "top") {
                    // Executar o script AHK para pular
                    console.log("------------------toppp CHAMADAAAAAAAA--------")
                    executarTecla('F9')
                }
                if (data.comment == "10") {
                    // Executar o script AHK para pular
                    console.log("------------------10 CHAMADAAAAAAAA--------")
                    // ls aiport teleport 
                    executarTecla('g')
                }

                if (data.comment == "nossa") {
                    // Executar o script AHK para pular
                    console.log("------------------nossa CHAMADAAAAAAAA--------")
                    // k -> Snow
                    executarTecla('k')
                }

            }
        });


    } catch (error) {
        console.error('Erro ao conectar à live:', error);
    }
};

module.exports = {
    connectToTikTokLive
};
