const express = require('express');
const tiktokController = require('../controllers/tiktokController');
const router = express.Router();

// Rota para iniciar a conexão com a live do TikTok
router.post('/monitorar', tiktokController.connectToTikTokLive);
router.post('/parar', tiktokController.disconnectFromTikTokLive);

router.post('/gifts', tiktokController.getAvailableGifts);
router.post('/top3', tiktokController.roomUser);
router.post('/newViewer', tiktokController.viewer);
router.post('/newSubscribers', tiktokController.subscribe);
router.post('/share', tiktokController.share);

module.exports = router;
