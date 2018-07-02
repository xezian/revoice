// declare initial dependancies
const dotenv = require('dotenv');
const express = require("express");
const bodyParser = require("body-parser");

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// either - or
const PORT = normalizePort(process.env.PORT || '3001');;

const app = express();
app.set('port', PORT);

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
  console.log('🌎   ~*==>');
  console.log('🌎    ~*==>');
  console.log('🌎      ~*==>');
  console.log('🌎        ~*==>');
  console.log('🌎           ~*==>');
  console.log('🌎               ~*==>');
  app.listen(PORT, function() {
    console.log(`🌎                   ~*==> Server now on port ${PORT}!`);
  });
}


module.exports = app;
