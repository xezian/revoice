// declare initial dependancies
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const util = require("util");

// either - or
const PORT = process.env.PORT || 3030;

const app = express();

// bodyParser is my fav band
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

// connect to the server
app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
