const React = require('react');
const ReactDOM = require('react-dom');
const Provider = require('react-redux').Provider;
const redux = require('redux');
const App = require('./components/App');
const reducer = require('./redux/reducer');

let store = redux.createStore(reducer);

window.onload = function() {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('mastermind-app')
    );
}
