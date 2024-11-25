const fs = require('fs');
const path = require('path');

// Caminho para o arquivo settings.json
// const settingsFilePath = 'C:/Users/Gabriel Freire/AppData/Local/Snap/Snap Camera/settings.json';
const settingsFilePath = path.join(process.env.LOCALAPPDATA, 'Snap/Snap Camera/settings.json');

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
const getLensShortcuts = () => {
    const settings = readSettingsFile();
    return settings.settings.shortcuts.lenses_shortcuts || [];
};



module.exports = { getRecents, getFavorites, getLensShortcuts };
