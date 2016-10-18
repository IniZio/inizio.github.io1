var express = require('express');
var app = express();
var path = require('path');

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/dist'));

// set the home page route
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/'));
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
