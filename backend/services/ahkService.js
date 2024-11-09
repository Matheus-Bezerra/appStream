const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

let ahkProcess = null; // Armazena o processo AHK

const executeAhk = async (preferences, username) => {
    const gtaPreferences = preferences.filter(pref => pref.modulo === 'GTA');

    if (gtaPreferences.length === 0) {
        console.log("Nenhuma ação para o módulo GTA encontrada.");
        return;
    }

    const ahkDir = path.join(__dirname, 'AutoHotKey');
    if (!fs.existsSync(ahkDir)) {
        fs.mkdirSync(ahkDir);
    }

    let ahkContent = `#Persistent\n#SingleInstance force\n\n`;
    gtaPreferences.forEach(pref => {
        if (pref.tecla) {
            ahkContent += `${pref.tecla}::\n    SendInput {${pref.tecla}}\nReturn\n\n`;
        }
    });

    const ahkFilePath = path.join(ahkDir, `${username}_gta.ahk`);
    fs.writeFileSync(ahkFilePath, ahkContent, 'utf8');
    console.log(`Arquivo AHK atualizado com sucesso: ${ahkFilePath}`);

    // Executa o arquivo AHK e armazena o processo
    ahkProcess = exec(`powershell -Command "Start-Process '${ahkFilePath}' -PassThru"`);

    ahkProcess.on('error', (error) => {
        console.error(`Erro ao executar o arquivo AHK: ${error.message}`);
    });

   
};

// Função para encerrar o processo AHK quando o serviço terminar
const stopAhk = () => {
    if (ahkProcess) {
        ahkProcess.kill(); // Encerra o processo AHK
        console.log('Processo AHK finalizado');
    } else {
        console.log('Nenhum processo AHK em execução');
    }
};

module.exports = { executeAhk, stopAhk };
