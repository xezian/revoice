// require models
const db = require('../models');

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
  create: (url) => {
    console.log(url);
    return new Promise((resolve, reject) => {
      db.Clip
        .create({originalClip: url}).save()
        .then(instance => {
          resolve(instance)
        })
        .catch(err => reject(err))
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
