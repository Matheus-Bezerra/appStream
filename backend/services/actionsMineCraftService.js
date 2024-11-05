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
        if (acao) {
            console.log("Executando comando para ''.");
            const resposta = await rcon.send(acao); // Comando para teletransportar
            console.log("Resposta do servidor:", resposta);

        }
        
        await rcon.disconnect();
    } catch (erro) {
        console.error('Erro ao executar ação no jogo:', erro);
    }
};

module.exports = { executarAcaoNoJogo };
