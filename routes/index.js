const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api');

// API Routes
router.use('/api', apiRoutes);
router.get('/', (req, res) => res.json("res.body"))

module.exports = router;
