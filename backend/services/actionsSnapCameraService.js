const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const keySender = require('node-key-sender');

// Caminho para o arquivo settings.json
// const settingsFilePath = 'C:/Users/Gabriel Freire/AppData/Local/Snap/Snap Camera/settings.json';
const settingsFilePath = path.join(process.env.LOCALAPPDATA, 'Snap/Snap Camera/settings.json');



// Serviço para obter os recentes
const getRecents = () => {
    const settings = readSettingsFile();
    return settings.lenses.recents || [];
};

// Serviço para obter os favoritos
const getFavorites = () => {
    const settings = readSettingsFile();
    return settings.lenses.favorites || [];
};

// Serviço para obter os atalhos das lentes
const getLensShortcuts = async () => {
    const isRunning = await isSnapCameraRunning();

    if (!isRunning) {
        console.log('Snap Camera não está em execução. Iniciando Snap Camera...');
        openSnapCamera();
        console.log('Snap Camera iniciado com sucesso.');
    } else {
        console.log('Snap Camera já está em execução. Nenhuma ação necessária.');
    }

    const settings = readSettingsFile();
    return settings.settings.shortcuts.lenses_shortcuts || [];
};




const addLensShortcut = async (lensId, shortcut) => {
    try {
        // Fecha o Snap Camera antes de modificar o arquivo
        await closeSnapCamera();

        const settings = readSettingsFile();

        // Adicionar o atalho à lista de shortcuts, se ainda não existir
        if (!settings.settings.shortcuts.lenses_shortcuts.some((item) => item.lens_id === lensId)) {
            settings.settings.shortcuts.lenses_shortcuts.push({ lens_id: lensId, shortcut });
        }

        // Adicionar o lensId à lista de favoritos, se ainda não estiver presente
        if (!settings.lenses.favorites.includes(lensId)) {
            settings.lenses.favorites.push(lensId);
        }

        // Salvar o arquivo atualizado
        saveSettingsFile(settings);



        return {
            shortcuts: settings.settings.shortcuts.lenses_shortcuts,
            favorites: settings.lenses.favorites
        };
    } catch (error) {
        console.error('Erro ao adicionar shortcut:', error.message);
        throw new Error('Erro ao adicionar shortcut.');
    }
};



// Função para ler o arquivo settings.json
function readSettingsFile() {
    try {
        const data = fs.readFileSync(settingsFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Erro ao ler o arquivo settings.json:', error);
        throw new Error('Não foi possível acessar as configurações do Snap Camera.');
    }
}

function saveSettingsFile(data) {
    try {
        fs.writeFileSync(settingsFilePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error('Erro ao salvar o arquivo settings.json:', error.message);
        throw new Error('Não foi possível salvar as alterações no Snap Camera.');
    }
}

async function closeSnapCamera() {
    const isRunning = await isSnapCameraRunning();

    if (!isRunning) {
        console.log('Snap Camera não está em execução. Nenhuma ação necessária.');
        return;
    }

    return new Promise((resolve, reject) => {
        exec('taskkill /IM "Snap Camera.exe" /F', (error, stdout, stderr) => {
            if (error) {
                console.error('Erro ao fechar o Snap Camera:', error.message);
                return reject(error);
            }
            console.log('Snap Camera fechado com sucesso.');
            resolve(stdout);
        });
    });
}

function openSnapCamera() {
    return new Promise((resolve, reject) => {
        // Usa o comando start para abrir o Snap Camera com foco
        exec('start "" "C:\\Program Files\\Snap Inc\\Snap Camera\\Snap Camera.exe"', (error, stdout, stderr) => {
            if (error) {
                console.error('Erro ao abrir o Snap Camera:', error.message);
                return reject(error);
            }
            console.log('Snap Camera iniciado com sucesso em foco.');
            resolve(stdout);
        });
    });
}





// Função para verificar se o Snap Camera está aberto
function isSnapCameraRunning() {
    return new Promise((resolve, reject) => {
        // Comando para listar processos em execução no Windows
        exec('tasklist', (error, stdout, stderr) => {
            if (error) {
                console.error('Erro ao verificar processos:', error.message);
                return reject(error);
            }
            // Verifica se o nome "Snap Camera.exe" aparece na lista de processos
            const isRunning = stdout.toLowerCase().includes('snap camera.exe');
            resolve(isRunning);
        });
    });
}

function executarEfeito(efeito) {
    console.log("entrei no snapcamera")
    console.log(`Simulando combinação de teclas para SnapCamera: ${efeito}`);
    // Divide a combinação em um array (ex.: "Ctrl+F" -> ["control", "f"])
    const combination = normalizeKeys(efeito.split('+'));
    keySender.sendCombination(combination)
        .then(() => console.log(`Combinação "${efeito}" simulada com sucesso!`))
        .catch(err => console.error('Erro ao simular a combinação:', err));
}


function executar(tecla) {
    console.log("entrei no gta")
    console.log(`Simulando combinação de teclas para gta: ${tecla}`);
    // Divide a combinação em um array (ex.: "Ctrl+F" -> ["control", "f"])
    const combination = normalizeKeys(tecla.split('+'));
    keySender.sendCombination(combination)
        .then(() => console.log(`Combinação "${tecla}" simulada com sucesso!`))
        .catch(err => console.error('Erro ao simular a combinação:', err));
}

function normalizeKeys(combination) {
    const keyMap = {
        'ctrl': 'control', // Mapeia Ctrl para control
        'alt': 'alt', // Caso precise mapear outras teclas
        'shift': 'shift'
    };

    return combination.map(key => keyMap[key.toLowerCase()] || key.toLowerCase());
}



module.exports = { getRecents, getFavorites, getLensShortcuts, addLensShortcut, executarEfeito, executar };
