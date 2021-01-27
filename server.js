// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// API endpoint.../api/timestamp // Displays current time.
app.get("/api/timestamp", function (req, res) {
  var current = new Date();
  var dateUTC = current.toUTCString();
  var dateUnix = current.getTime();
  res.json({unix: dateUnix, utc: dateUTC});
});

// API endpoint /api/timestamp/:date?
//Test UNIX  https://boilerplate-project-timestamp-1.jordash.repl.co/api/timestamp/1451001600000
//Test UTC  https://boilerplate-project-timestamp-1.jordash.repl.co/api/timestamp/2015-12-25
// Displays specified date
app.get('/api/timestamp/:date', function(req, res){
  let rawdate = req.params.date;
  //RegEx to detect string with numbers only
  let regex = /^[0-9]*$/gm;
  //check if date input is string or number
  let regextest = regex.test(rawdate);
  //If datestring contains only numbers
  if ( regextest ){
    //Convert datestring into number
    let numdate = parseFloat(rawdate);
    //Generate correct UTC string
    numdate = new Date(numdate);
    let converted = numdate.toUTCString();
    res.json( {'unix': parseFloat(rawdate),'utc': `${converted}` } );
  }
  else {
    rawdate = new Date(req.params.date);
    //Generate correct Unix string
    let converted = rawdate.valueOf();
    //Check if the date was valid and able to be converted
    if ( converted ){
      res.json( {'unix': converted, 'utc': rawdate.toUTCString() } );
    }
    else {
      //date is invalid, output error
      res.json( { error : "Invalid Date" } );
    }
  }
});

app.use( bodyParser.urlencoded({extended: false}));


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
