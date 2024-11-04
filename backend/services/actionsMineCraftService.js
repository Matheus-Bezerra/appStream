// Instância do RCON
const Rcon = require('modern-rcon'); // Importa o pacote modern-rcon

const rcon = new Rcon(
    'localhost',   // Host do servidor
    25575,         // Porta RCON configurada no server.properties
    'teste', // Senha definida no server.properties
);


const executarAcaoNoJogo = async (acao, username) => {
    console.log("Ação recebida:", acao);
    console.log("username recebida:", username);
    try {
        // Conectar apenas se não estiver autenticado
        if (!rcon.isAuthenticated) {
            await rcon.connect(); // Conecta ao servidor via RCON
        }
        if (acao === 'Rose') {
            console.log("Executando comando para 'safa'.");
            await rcon.send('tp Bielfreire1 ~ ~10 ~'); // Comando para teletransportar
        } else if (acao === 'Pumpkin') {
            console.log("Executando comando para 'top'.");
            await rcon.send('give Bielfreire1 minecraft:diamond 5'); // Dá 5 diamantes
        } else if (acao === '10') {
            console.log("Executando comando para '10'.");
            await rcon.send('time set day'); // Muda o horário para dia
        }
        // Desconectar se necessário
        await rcon.disconnect();
    } catch (erro) {
        console.error('Erro ao executar ação no jogo:', erro);
    }
};

module.exports = { executarAcaoNoJogo };
