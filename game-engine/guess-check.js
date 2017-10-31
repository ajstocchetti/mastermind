class Guess {
  constructor(guess, actual) {
    this.guess = guess;
    this.placement = 0;
    this.color = 0;

    const actualColors = {};
    const guessColors = {};
    actual.forEach((color, index) => {
      const guessColor = guess[index];
      if (guessColor == color) this.placement++;
      else {
        actualColors[color] = actualColors[color] ? actualColors[color]++ : 1;
        guessColors[guessColor] = guessColors[guessColor] ? guessColors[guessColor]++ : 1;
      }
    });
    Object.keys(actualColors).forEach(color => {
      const numAct = actualColors[color];
      const numGuess = guessColors[color] || 0;
      if (numGuess > numAct) this.color += numAct;
      else this.color += numGuess;
    });
  }
}

module.exports = Guess;
