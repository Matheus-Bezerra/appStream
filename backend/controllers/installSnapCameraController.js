const installSnapCameraService = require('../services/installSnapCameraService');

exports.installSnapCamera = async (req, res) => {
    try {
        const message = await installSnapCameraService.installSnapCamera();
        res.json({ success: true, message });
    } catch (error) {
        console.error('Erro ao instalar Snap Camera:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
