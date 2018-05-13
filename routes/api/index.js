const router = require('express').Router();
const clipRoutes = require('./clips');

// api routes (matches with /api/..)
router.use('/clips', clipRoutes);

module.exports = router;
