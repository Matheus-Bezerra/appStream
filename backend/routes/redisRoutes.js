const express = require('express');
const redisController = require('../controllers/redisController');
const router = express.Router();

// Rota para iniciar a conexão com a live do TikTok
router.post('/salvar', redisController.saveUserPreferences);
router.get('/buscar', redisController.getUserPreferences); 
router.post('/avaliableGift', redisController.saveGiftAvailable); 
router.get('/getGift', redisController.getGiftAvailable); 



module.exports = router;
