const express = require('express');
const router = express.Router(); 
const { register, login } = require('../controllers/authController');
const { protect, authorize } = require("../middlewares/authMiddleware");

router.post('/register', protect, authorize(['admin']), register);

router.post('/login', login);

module.exports = router;
