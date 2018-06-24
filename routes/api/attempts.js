const router = require('express').Router();
const clipsController = require('../../controllers/clipsController');

// Matches with "/api/attempts"
router
  .get('/:id', clipsController.retrieveThree);

module.exports = router;