const express = require('express');
const db = require('../database/db-mysql');
const morgan = require('morgan');
const routes = require('./routes.js');
const bodyparser = require('body-parser');
var path = require ('path')

const app = express();

// app.use(morgan);
app.use('/homes/:homeId', express.static(__dirname + '/../public'));
app.use(bodyparser('json'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/homes', routes);



app.listen(3003, () => console.log('listing on port 3003...'))