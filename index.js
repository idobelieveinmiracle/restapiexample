const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

app.use(express.static('bublic'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json());

// init routes
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function(err, req, res, next){
  // console.log(err);
  res.status(422).send({error: err.message});
});

//  listen for request
app.listen(process.env.port || 8000, function(){
  console.log('started listening...'); 
});
