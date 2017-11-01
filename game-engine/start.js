const solnSpace = require('./mastermind-solver');

solnSpace.ready().then(() => {
  solnSpace.makeSolutionSpace(6, 4);
});
