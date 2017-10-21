const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const lusca = require('lusca');
const MasterMind = require('./engine');

let mastermind;

const app = express();
// Security
app.use(helmet());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
// config
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/newgame', (req, res) => {
  const { guesses, colors, pieces } = req.body;
  mastermind = new MasterMind(guesses, colors, pieces);
  mastermind.setBoardRandom();
  res.status(200).send();
});

app.put('/attempt', (req, res) => {
  try {
    const guess = JSON.parse(req.body.guess);
    mastermind.attempt(guess);
    const clean = {
      maxTries: mastermind.maxTries,
      tries: mastermind.tries,
      numColors: mastermind.numColors,
      numPieces: mastermind.numPieces,
      gameState: mastermind.gameState,
    };
    res.json(clean);
  } catch (err) {
    res.status(400).json({
      msg: err.message,
    });
  }
});


/**
 * Error Handling
 */
app.use('*', function(req, res) {
    res.status(404).json({
      msg: 'The requestd page could not be found',
    });
});

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).json({
    mgs: 'Internal server error',
  });
});


module.exports = app;
