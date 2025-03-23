const express = require('express');
const router = express.Router();

const renterWorkController = require('../controllers/RenterWork');
router.post('/Add_Item',renterWorkController.Add_Item);

module.exports = router;