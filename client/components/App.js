const React = require('react');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            forecast: [],
            error: '',
        };
    }

    render() {
        return (
            <div style={{ marginTop: '25px' }}>
                <h2>MasterMind!</h2>
            </div>
        );
    };
}

module.exports = App;
