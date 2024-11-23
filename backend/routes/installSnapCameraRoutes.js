const express = require('express');
const installSnapCameraController = require('../controllers/installSnapCameraController');
const router = express.Router();

router.post('/install', installSnapCameraController.installSnapCamera);

module.exports = router;
