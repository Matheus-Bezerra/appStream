const express = require('express');
const webcamController = require('../controllers/webcamController');
const router = express.Router();

router.post('/ligar', webcamController.ligarWebcam);
router.post('/piscar-tela', webcamController.piscarTela);


module.exports = router;
