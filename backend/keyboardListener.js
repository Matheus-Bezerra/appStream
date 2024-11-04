const { GlobalKeyboardListener } = require('node-global-key-listener');
const { ligarWebcam, piscarTela } = require('./services/webcamService');




const listener = new GlobalKeyboardListener();

listener.addListener((event) => {
    // console.log(`Tecla pressionada: ${event.name}`);

    // Liga a webcam ao pressionar "M"
    // if (event.name.toLowerCase() === 'm') {
    //     ligarWebcam();  // Agora chama a função sem passar callback
    // }

    // // Ação ao pressionar a tecla "B"
    // if (event.name.toLowerCase() === 'b') {
    //     // Envia um sinal ao front-end para "piscar" a tela
    //     piscarTela();
    // }
});

listener.start();
