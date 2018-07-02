const ko = require('nekodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/revoice';
console.log('hello')
console.log(MONGODB_URI);
ko.connect({
  client: 'mongodb',
  url: MONGODB_URI,
});

module.exports = {
  Clip: require('./Clip'),
  Attempt: require('./Attempt'),
};