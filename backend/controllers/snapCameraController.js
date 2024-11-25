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
  
