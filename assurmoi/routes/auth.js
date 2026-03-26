const express = require('express')
const router = express.Router();
const { login, logout, register } = require('../services/auth');
const { validateAuthentication } = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', validateAuthentication, logout);

module.exports = router