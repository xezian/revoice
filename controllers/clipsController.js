// require models
const db = require('../models');

// export functions to handle db interaction for Clips
module.exports = {
  retrieve: (req, res) => {
    db.Clip
      .findById(req.body.id)
      .join()
      .then(instances => res.json(instances))
      .catch(err => res.status(422).json(err));
  },
  create: (req, res) => {
    db.Clip
      .create(req.body).save()
      .then(instance => res.json(instance))
      .catch(err => res.status(422).json(err));
  },
  remove: (req, res) => {
    db.Clip
      .deleteById(req.params.id)
      .then(delCount => res.send(`${delCount} records deleted`))
      .catch(err => res.status(422).json(err));
  },
};
