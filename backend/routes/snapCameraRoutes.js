const express = require('express');
const router = express.Router();
const snapCameraController = require('../controllers/snapCameraController');

// Rota para obter recentes
router.get('/recents', snapCameraController.getRecents);

// Rota para obter favoritos
router.get('/favorites', snapCameraController.getFavorites);

// Rota para obter os atalhos das lentes
router.get('/shortcuts', snapCameraController.getLensShortcuts);


module.exports = router;
