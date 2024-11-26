const fs = require('fs');
const path = require('path');

// Caminho do arquivo settings.json
const settingsFilePath = path.join(process.env.LOCALAPPDATA, 'Snap/Snap Camera/settings.json');

// Função para monitorar o arquivo
function monitorSettingsFile() {
  console.log(`Monitorando alterações no arquivo: ${settingsFilePath}`);

  fs.watch(settingsFilePath, (eventType, filename) => {
    if (filename) {
      console.log(`O arquivo ${filename} foi alterado. Tipo de evento: ${eventType}`);

      // Ler o conteúdo atualizado do arquivo
      try {
        const data = fs.readFileSync(settingsFilePath, 'utf-8');
        const settings = JSON.parse(data);
        console.log('Novo conteúdo do arquivo:', settings);
      } catch (error) {
        console.error('Erro ao ler o arquivo modificado:', error.message);
      }
    }
  });
}

// Inicia o monitoramento
monitorSettingsFile();
