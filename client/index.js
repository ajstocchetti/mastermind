const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./components/App');


window.onload = function() {
    ReactDOM.render(<App />, document.getElementById('mastermind-app'));
}
