const mongoose = require('mongoose');

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/eciov");

module.exports = {
  Clip: require('./Clip'),
};