const express = require('express');
const router = express.Router();

const authenticateToken = require('../middleware/authenticateToken');
const fileController  = require('../controllers/fileController');
const fileUpload = require('../utils/fileUpload')
const authControleer = require('../controllers/authController')

router.post('/upload', authenticateToken, fileUpload.upload.single('file'), fileController.uploadFiles);
router.get('/files/:filename', authenticateToken, fileController.getFile);
router.get('/listFiles', authenticateToken, fileController.listFiles);
router.post('/deleteFiles/:filename', authenticateToken, fileController.deleteFiles);

// Generate a sample token to access any of the above routes
router.get('/generateToken', authControleer.generateToken)

module.exports = router;