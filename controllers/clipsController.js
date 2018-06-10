// require models
const db = require('../models');
const storeThisObj = require('./storeThisObj');

// export functions to handle db interaction for Clips
module.exports = {
  retrieveOne: (req, res) => {
    db.Clip
      .findById(req.params.id)
      .sort({ date: -1 })
      .then(instances => res.json(instances))
      .catch(err => res.status(422).json(err));
  },
  retrieveAll: (req, res) => {
    db.Clip
      .find({})
      .then(instances => res.json(instances))
      .catch(err => res.status(422).json(err));
  },
  create: (req, res) => {
    storeThisObj(req.body.clipUrl).then(newUrl => {
      console.log(newUrl);
      db.Clip
        .create({originalClip:newUrl})
        .then(instance => res.json(instance))
        .catch(err => res.status(422).json(err));
    })
  },
  attempt: (req, res) => {
    db.Clip
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(instance => res.json(instance))
      .catch(err => res.status(422).json(err));
  },
  remove: (req, res) => {
    db.Clip
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(delCount => res.send(`${delCount} records deleted`))
      .catch(err => res.status(422).json(err));
  },
};
