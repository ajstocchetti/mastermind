const path = require('path');
const webpack = require('webpack');


module.exports = {
    entry: [
        path.resolve(__dirname, 'client/src/index.js'),
    ],
    output: {
        path: path.resolve(__dirname, 'client/public'),
        filename: 'app.js',
        publicPath: '/'
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        // new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [{
            test: /\.js$/,
            include: [ path.resolve(__dirname, 'client/src') ],
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [ 'react', 'env' ],
                    plugins: [
                      'transform-class-properties',
                      'transform-object-rest-spread',
                    ],
                }
            }],
        },
        {
            test: /\.less$/,
            use: [
              'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            },
          },
]
        }],
    },
    devServer: {
      port: 3000,
      historyApiFallback: {
        index: './client/public/index.html'
      },
      proxy: {
        "/api/**": {
          target: "http://localhost:2323/",
          secure: false,
        },
      },
    },
};
