const express = require('express');
const soundController = require('../controllers/soundController');
const router = express.Router();

// Rota para iniciar a conexão com a live do TikTok
router.get('/buscar', soundController.getUserSounds); 
router.get('/topSounds', soundController.getTopSounds);




module.exports = router;
