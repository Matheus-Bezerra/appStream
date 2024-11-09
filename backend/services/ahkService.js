const { exec, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');

let ahkProcess = null;  // Variável para armazenar o processo do AHK

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

    // Iniciar o script AHK em segundo plano e armazenar o processo
    ahkProcess = spawn('powershell', ['-Command', `Start-Process '${ahkFilePath}' -WindowStyle Hidden`], { detached: true, stdio: 'ignore' });
    ahkProcess.unref();  // Permite que o processo continue em segundo plano

    console.log('Script AHK executado em segundo plano.');
};

// Função para finalizar o script AHK
const stopAhk = () => {
    if (ahkProcess) {
        // Encerra o processo AHK usando o PID
        exec(`taskkill /PID ${ahkProcess.pid} /F`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Erro ao encerrar o processo AHK: ${error.message}`);
                return;
            }
            console.log('Processo AHK finalizado com sucesso.');
        });
    } else {
        console.log('Nenhum processo AHK encontrado para finalizar.');
    }
};

module.exports = { executeAhk, stopAhk };
