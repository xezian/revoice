const router = require('express').Router();
const clipsController = require('../../controllers/clipsController');

// Matches with "/api/clips"
router
  .get('/', clipsController.retrieveSome)
  .get('/:id', clipsController.retrieveOne)
  .post('/:id', clipsController.attempt)
  .delete('/:id', clipsController.remove);

module.exports = router;
