const path = require('path');
const webpack = require('webpack');


module.exports = {
    entry: [
        path.resolve(__dirname, 'client/index.js'),
    ],
    output: {
        path: path.resolve(__dirname, 'client/public'),
        filename: 'app.js',
        publicPath: '/'
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [{
            test: /\.js$/,
            include: [
                path.resolve(__dirname, 'client/components'),
                path.resolve(__dirname, 'client/index.js'),
            ],
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        'react',
                    ],
                    plugins: [require('babel-plugin-transform-class-properties')]
                }
            }, ]
        }],
    },
    // devServer: {
    //     hot: true,
    //     contentBase: './build/public',
    //     inline: true,
    //     publicPath: 'http://localhost:8080/',
    //     port: 8080
    // },
};
