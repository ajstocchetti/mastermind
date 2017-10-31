const React = require('react');
const Newgame = require('./newgame');
const Row = require('./guessrow/guessrow');

class App extends React.Component {
    render() {
        return (
            <div style={{ marginTop: '25px' }}>
                <h2>MasterMind!</h2>
                <Newgame />
                <Row />
            </div>
        );
    };
}

module.exports = App;
