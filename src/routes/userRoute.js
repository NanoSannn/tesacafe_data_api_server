const express = require('express');
const router = express.Router();
const uesrController = require('../controllers/userController');

router.post("/register", uesrController.register);
router.post("/login", uesrController.login);

module.exports = router;