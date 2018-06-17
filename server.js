// declare initial dependancies
const dotenv = require('dotenv');
const express = require("express");
const bodyParser = require("body-parser");

// either - or
const PORT = process.env.PORT || 3030;

const app = express();

// config it
dotenv.config();

// bodyParser is my fav band
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('./routes'));

// for production only! then the client/build directory has it all.
if( process.env.NODE_ENV === 'production' ){
  app.use(express.static('client/build'));
};

// for production only! where we serve the index.html through which our React code is delivered
if( process.env.NODE_ENV === 'production' ){
  app.get('*', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html');
  });
};

if(!module.parent) {
  // connect to the server
  console.log('🌎');
  console.log('🌎>');
  console.log('🌎=>');
  console.log('🌎==>');
  console.log('🌎*==>');
  console.log('🌎~*==>');
  console.log('🌎 ~*==>');
  console.log('🌎  ~*==>');
  app.listen(PORT, function() {
    console.log(`🌎   ~*==> Server now on port ${PORT}!`);
  });
}


module.exports = app;
