const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const lusca = require('lusca');
const path = require('path');
const router = require('./routes');

const app = express();
// Security
app.use(helmet());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
// config
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/public')));
app.use('/api', router);

const indexPath = path.resolve(__dirname, '../client/public/index.html');
app.use(function(req, res) {
    // all non-api routes load the client app
    // let react deal with client routing
    res.sendFile(indexPath);
});


/**
 * Error Handling
 */

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).json({
    mgs: 'Internal server error',
  });
});


module.exports = app;
