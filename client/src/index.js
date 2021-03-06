const logger = require('redux-logger').logger;
const React = require('react');
const ReactDOM = require('react-dom');
const Provider = require('react-redux').Provider;
const redux = require('redux');
const requestMW = require('./redux/requestMiddleware');
const App = require('./components/App');
const reducer = require('./redux/reducer');

let store = redux.createStore(reducer, redux.applyMiddleware(logger, requestMW));

window.onload = function() {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('mastermind-app')
    );
}
