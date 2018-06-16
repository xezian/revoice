const router = require('express').Router();
const clipRoutes = require('./clips');
const uploadRoute = require('./upload');
// api routes (matches with /api/..)
router.use('/clips', clipRoutes);
router.use('/upload', uploadRoute);
module.exports = router;
