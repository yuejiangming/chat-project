 var path = require('path');
 var webpack = require('webpack');

 module.exports = {
    entry: __dirname + '/public/src/app.js',
    output: {
        path: __dirname + '/public/build',
        filename: '[name].[hash].js',
        publicPath: '/build/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    devtool: 'source-map'
 };
 