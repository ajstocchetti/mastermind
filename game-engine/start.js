const solnSpace = require('./solution-spaces');

solnSpace.ready().then(() => {
  solnSpace.makeSolutionSpace(6, 4);
});
