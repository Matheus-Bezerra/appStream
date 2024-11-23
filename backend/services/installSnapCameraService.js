const fs = require('fs');
const path = require('path');
const sudo = require('sudo-prompt');

const isSnapCameraInstalled = () => {
    const snapCameraPath = 'C:\\Program Files\\Snap Inc\\Snap Camera\\Snap Camera.exe';
    return fs.existsSync(snapCameraPath);
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Função para executar comandos como administrador
const executeCommandAsAdmin = (command) => {
    return new Promise((resolve, reject) => {
        sudo.exec(command, { name: 'Snap Camera Installer' }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Erro ao executar comando como administrador: ${error.message}`);
                reject(error);
            } else {
                resolve(stdout.trim());
            }
        });
    });
};

exports.installSnapCamera = async () => {
    try {
        console.log('Iniciando o processo de instalação do Snap Camera...');

        if (isSnapCameraInstalled()) {
            console.log('Snap Camera já está instalado.');
            return 'Snap Camera já está instalado.';
        }

        const installerPath = path.resolve(__dirname, '../files/snap-camera-1-21.exe');
        const patchedPath = path.resolve(__dirname, '../files/Snap Camera (patched).exe');
        const installDir = 'C:\\Program Files\\Snap Inc\\Snap Camera';
        const originalPath = path.join(installDir, 'Snap Camera.exe');

        // 1. Executar o instalador local com permissões elevadas
        console.log('Instalando Snap Camera...');
        await executeCommandAsAdmin(`"${installerPath}" /S`);
        console.log('Snap Camera instalado com sucesso.');

        // 2. Aguarde um intervalo para garantir que o Snap Camera inicie
        console.log('Aguardando Snap Camera iniciar...');
        await sleep(5000);

        // 3. Encerrar o Snap Camera, que inicia automaticamente após a instalação
        console.log('Encerrando Snap Camera...');
        await executeCommandAsAdmin('taskkill /F /IM "Snap Camera.exe"');

        // 4. Aplicar o patch com permissões elevadas
        console.log('Aplicando patch...');
        await executeCommandAsAdmin(`del /Q "${originalPath}"`);
        await executeCommandAsAdmin(`copy /Y "${patchedPath}" "${originalPath}"`);
        console.log('Patch aplicado com sucesso.');

        return 'Snap Camera instalado e patch aplicado com sucesso.';
    } catch (error) {
        console.error('Erro ao instalar Snap Camera:', error.message);
        throw new Error('Erro ao instalar Snap Camera.');
    }
};
