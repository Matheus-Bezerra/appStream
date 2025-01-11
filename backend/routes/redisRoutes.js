const express = require('express');
const redisController = require('../controllers/redisController');
const router = express.Router();

// Rota para salvar geral
router.post('/salvar', redisController.saveUserPreferences);
router.get('/buscar', redisController.getUserPreferences); 

// Pre-definicoes
router.post('/pre-definicao', redisController.savePredefinicao);
router.get('/pre-definicao/:nome', redisController.getPredefinicao); 
router.delete('/pre-definicao/:usuario', redisController.deleteTodasPredefinicoes);//deleta todas
router.delete('/pre-definicao/:usuario/:id', redisController.deletePredefinicao); //deleta uma pre-de especifica

router.put('/pre-definicao/ativar/:usuario/:id', redisController.tornarAtiva);
router.patch('/pre-definicao/renomear/:usuario/:id', redisController.renomearPredefinicao);


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



  