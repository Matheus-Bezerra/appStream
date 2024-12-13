const express = require('express');
const redisController = require('../controllers/redisController');
const router = express.Router();

// Rota para salvar geral
router.post('/salvar', redisController.saveUserPreferences);
router.get('/buscar', redisController.getUserPreferences); 

// Pre-definicoes
router.post('/eventos', redisController.saveEventos);
router.get('/eventos', redisController.getEventos); 

// eventos
router.post('/eventos', redisController.saveEventos);
router.get('/eventos', redisController.getEventos); 

// pegar presentes 
router.post('/avaliableGift', redisController.saveGiftAvailable); 
router.get('/getGift', redisController.getGiftAvailable); 

// pegars sons
router.post('/avaliableSounds', redisController.saveSounds); 
router.get('/getSounds', redisController.getSounds); 

// salvar efeitos
router.post('/saveEffects', redisController.saveEffects); 
router.get('/getEffects', redisController.getEffects); 



module.exports = router;



  