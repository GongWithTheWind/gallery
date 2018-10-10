const nr = require('newrelic');
const express = require('express');
const db = require('../database/db-mysql');
const morgan = require('morgan');
const routes = require('./routes.js');
const bodyparser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 3003;

const app = express();
// app.use(cors());
// app.use(morgan());
app.use('/homes/:homeId', express.static(__dirname + '/../public'));
app.use(bodyparser('json'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/homes', routes);



app.listen(port, () => console.log(`listing on port ${port}`))