const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'client/index.js'),
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
        ],
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'client/public')
    },
};
