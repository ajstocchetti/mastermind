const express = require('express');
const MasterMind = require('./engine');

let mastermind;
const router = express.Router();

router.post('/newgame', (req, res) => {
  const { guesses, colors, pieces } = req.body;
  mastermind = new MasterMind(guesses, colors, pieces);
  mastermind.setBoardRandom();
  res.status(200).send();
});


router.put('/attempt', (req, res) => {
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
router.use(function(req, res) {
    res.status(404).json({
      msg: 'The requestd page could not be found',
    });
});

router.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).json({
    mgs: 'Internal server error',
  });
});


module.exports = router;
