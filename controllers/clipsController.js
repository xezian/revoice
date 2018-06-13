// require models
const db = require('../models');
const storeThisObj = require('./storeThisObj');

// export functions to handle db interaction for Clips
module.exports = {
  retrieveOne: (req, res) => {
    db.Clip
      .findById(req.params.id)
      .then(instances => res.json(instances))
      .catch(err => res.status(422).json(err));
  },
  retrieveAll: (req, res) => {
    db.Clip
      .find({})
      .join()
      .then(instances => res.json(instances))
      .catch(err => res.status(422).json(err));
  },
  create: (req, res) => {
    storeThisObj(req.body.clipUrl).then(newUrl => {
      console.log(newUrl);
      db.Clip
        .create({originalClip:newUrl}).save()
        .then(instance => res.json(instance))
        .catch(err => res.status(422).json(err));
    })
  },
  attempt: (req, res) => {
    db.Clip
      .findById(req.params.id)
      .then((instance) => { 
        const newInst = Object.assign(instance, req.body);
        return newInst.save();
      })
      .catch(err => res.status(422).json(err));
  },
  remove: (req, res) => {
    db.Clip
      .deleteById(req.params.id)
      .then(delCount => res.send(`${delCount} records deleted`))
      .catch(err => res.status(422).json(err));
  },
};
