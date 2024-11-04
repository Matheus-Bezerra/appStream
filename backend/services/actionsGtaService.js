const { exec } = require('child_process');  // Importar o módulo para executar comandos


const executarTecla = (tecla) => {
    console.log("teclaaa-------------------->", tecla)
    // Simula o envio direto de uma tecla para o AHK
    exec(`powershell -Command "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SendKeys]::SendWait('${tecla}')"`, 
    (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro ao enviar tecla: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Erro: ${stderr}`);
            return;
        }
        console.log(`Tecla enviada com sucesso: ${stdout}`);
    });
};
module.exports = { executarTecla };