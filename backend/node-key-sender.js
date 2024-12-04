const keySender = require('node-key-sender');

// Simula o pressionamento de Ctrl + F
keySender.sendCombination(['control', 'f'])
    .then(() => console.log('Teclas Ctrl + F simuladas com sucesso!'))
    .catch((err) => console.error('Erro ao simular as teclas:', err));
