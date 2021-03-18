var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors');

// Create global app object
var app = express();

app.use(cors());

// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./routes/notification-routes'));

// finally, let's start our server...
var server = app.listen( process.env.PORT || 3000, function(){
    console.log('Listening on port ' + server.address().port);
});