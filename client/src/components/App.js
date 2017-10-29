const React = require('react');
const Newgame = require('./newgame');
const Helper = require('./helper.js');
const Row = require('./guessrow/guessrow');
class App extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //     };
    // }

    render() {
        return (
            <div style={{ marginTop: '25px' }}>
                <h2>MasterMind!</h2>
                <Newgame />
                <Row colors={6} spaces={4} />
            </div>
        );
    };
}

module.exports = App;
