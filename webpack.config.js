var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

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
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'main.blade.php',
            template: './public/src/chat.template.html'
        }),
        new CleanWebpackPlugin(['./public/build'])
    ],
    devtool: 'source-map'
};
