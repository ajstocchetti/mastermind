const solnSpace = require('./solution-spaces');
const utils = require('./utils');


utils.ready().then(() => {
  solnSpace.makeSolutionSpace(6, 4);
});
