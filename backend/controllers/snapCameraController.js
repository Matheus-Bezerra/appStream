const actionsSnapCameraService = require('../services/actionsSnapCameraService');

// Controlador para obter os recentes
exports.getRecents = async (req, res) => {
    try {
        const recents = await actionsSnapCameraService.getRecents();
        res.status(200).json(recents);
    } catch (error) {
        console.error('Erro ao obter recentes:', error);
        res.status(500).json({ error: 'Erro ao obter os recentes' });
    }
};

// Controlador para obter os favoritos
exports.getFavorites = async (req, res) => {
    try {
        const favorites = await actionsSnapCameraService.getFavorites();
        res.status(200).json(favorites);
    } catch (error) {
        console.error('Erro ao obter favoritos:', error);
        res.status(500).json({ error: 'Erro ao obter os favoritos' });
    }
};


// Controlador para obter os atalhos das lentes
exports.getLensShortcuts = async (req, res) => {
    try {
        const lensShortcuts = await actionsSnapCameraService.getLensShortcuts();
        res.status(200).json(lensShortcuts);
    } catch (error) {
        console.error('Erro ao obter atalhos das lentes:', error);
        res.status(500).json({ error: 'Erro ao obter os atalhos das lentes' });
    }
};

exports.addLensShortcut = async (req, res) => {
    const { lens_id, shortcut } = req.body;

    try {
        if (!lens_id || !shortcut) {
            return res.status(400).json({ error: 'lensId e shortcut são obrigatórios.' });
        }

        const { shortcuts, favorites } = await actionsSnapCameraService.addLensShortcut(lens_id, shortcut);
        res.status(200).json({
            message: 'Shortcut e favorito adicionados com sucesso.',
            shortcuts,
            favorites
        });
    } catch (error) {
        console.error('Erro ao adicionar shortcut:', error);
        res.status(500).json({ error: 'Erro ao adicionar o shortcut.' });
    }
};


