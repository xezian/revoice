const router = require('express').Router();
const clipsController = require('../../controllers/clipsController');

// Matches with "/api/clips"
router
  .get('/', clipsController.retrieve)
  .post('/:id', clipsController.create)
  .delete('/:id', clipsController.remove);

module.exports = router;
