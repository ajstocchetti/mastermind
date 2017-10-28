const React = require('react');
const connect = require('react-redux').connect;
const submit = require('../../redux/dispatcher').game.newGame;

class newgame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            guesses: 10,
            colors: 6,
            pieces: 4,
        };
    }

    setItem = key => {
      return function updateState(event) {
        const update = {};
        update[key] = event.target.value;
        this.setState(update);
      };
    }

    submitConfig = () => {
      this.props.submit(this.state.guesses, this.state.colors, this.state.pieces);
    }

    render() {
        return (
            <div>
              <div>
                <label>Guesses:</label>
                <input type="number" value={this.state.guesses}
                  onChange={this.setItem('guesses').bind(this)}
                />
              </div>
              <div>
                <label>Colors:</label>
                <input type="number" value={this.state.colors}
                  onChange={this.setItem('colors').bind(this)}
                />
              </div>
              <div>
                <label>Pieces:</label>
                <input type="number" value={this.state.pieces}
                  onChange={this.setItem('pieces').bind(this)}
                />
              </div>
              <button onClick={this.submitConfig}>New Game</button>
            </div>
        );
    };
}

module.exports = connect(() => ({}), { submit })(newgame);
