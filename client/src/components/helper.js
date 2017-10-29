const React = require('react');
const Guess = require('./guessspot/guess')

class Helper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      color: -1,
    };
  }

  advaceColor = () => {
    this.setState({ color: ++this.state.color });
  }

  render() {
    return (
      <div>
        <Guess
          color={this.state.color}
          change={this.advaceColor}
        />
      </div>
    );
  }

};

module.exports = Helper;
