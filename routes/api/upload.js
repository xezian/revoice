const clipsController = require('../../controllers/clipsController');
const router = require('express').Router();
const aws = require('aws-sdk');
const multer = require('multer');
const multers3 = require('multer-s3');
const axios = require('axios');
const path = require('path');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-west-1',
});

const s3 = new aws.S3();

const upload = multer({
  storage: multers3({
    s3,
    bucket: process.env.S3_BUCKET,
    acl: 'public-read',
    key(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
});

router.post('/', upload.any(), (req, res) => {
  console.log(req.files[0]);
  const url = req.files[0].location;
  const etag = req.files[0].etag;
  clipsController.create(url, etag).then((inst) =>{
    res.json(inst);
  }).catch((err) => {
    res.status(422).json(err);
  })
});

router.post('/:id', upload.any(), (req, res) => {
  const score = parseInt(req.body.score);
  const url = req.files[0].location;
  const etag = req.files[0].etag;
  const successObj = {
    attempt: url,
    score: score,
    awsEtag: etag,
    clip: req.params.id
  }
  console.log(successObj);
  clipsController.attempt(successObj).then((inst) => {
    res.json(inst);
  }).catch((err) => {
    res.status(422).json(err);
  })
})
  
module.exports = router;