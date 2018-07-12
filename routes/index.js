const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api');

// API Routes
router.use('/api', apiRoutes);
// If no API routes are hit, send the React app
<<<<<<< HEAD
router.use((req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});
=======
>>>>>>> 50aeaf92566575ab752f3e3af132946e6dfeea6a

module.exports = router;
