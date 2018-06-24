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
  retrieveSome: (req, res) => {
    db.Clip
      .find({})
      .sort(req.body.sort || {date: -1})
      .limit(req.body.limit || 10)
      .join()
      .then(instances => res.json(instances))
      .catch(err => res.status(422).json(err));
  },
  retrieveThree: (req, res) => {
    db.Attempt
      .find({clip:`${req.params.id}`})
      .limit(3)
      .join()
      .then(instances => res.json(instances))
      .catch(err => res.status(422).json(err));
  },
  create: (url, etag) => {
    console.log(url);
    return new Promise((res, rej) => {
      db.Clip
        .create({
          originalClip: url,
          awsEtag: etag,
        }).save()
        .then(instance => {
          res(instance)
        })
        .catch(err => rej(err))
    })
  },
  attempt: (successObj) => {
    return new Promise((res, rej) => {
      db.Attempt
        .create(successObj).save()
        .then((instance) => {
          console.log('youoyouhouho!')
          res(instance);
        })
        .catch(err => rej(err));
    })
  },
  remove: (req, res) => {
    db.Clip
      .deleteById(req.params.id)
      .then(delCount => res.send(`${delCount} records deleted`))
      .catch(err => res.status(422).json(err));
  },
};
