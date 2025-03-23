const express = require('express');
const router = express.Router();

const renterController = require('../controllers/RenterAuth');

router.post('/register', renterController.register);
router.post('/login',renterController.login);


module.exports = router;