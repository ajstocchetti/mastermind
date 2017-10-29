const axios = require('axios');
const actions = require('./actions');


const middleware = store => next => action => {
  if (!(action.API && action.types)) {
    // not a request action, continue as usual
    next(action);
  } else {
    const { types, ...rest } = action;
    // setup action to properly dispatch original action
    action.type = action.types[0];
    next(action);

    // make request and follow up
    const reqConfig = {
      url: action.API.url,
      method: action.API.method,
      data: action.API.body,
    }
    return axios(reqConfig).then(
      RESPONSE => store.dispatch({ ...rest, RESPONSE, type: types[1] }),
      ERROR => store.dispatch({ ...rest, ERROR, type: types[2] })
    ).catch(
      ERROR => store.dispatch({ ...rest, ERROR, type: types[2] })
    );
  }
};

module.exports = middleware;
