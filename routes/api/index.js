const router = require('express').Router();
const clipRoutes = require('./clips');
const uploadRoute = require('./upload');
const attemptsRoute = require('./attempts');
// api routes (matches with /api/..)
router.use('/attempts', attemptsRoute);
router.use('/clips', clipRoutes);
router.use('/upload', uploadRoute);
module.exports = router;
