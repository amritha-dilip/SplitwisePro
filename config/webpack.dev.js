var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var path = require('path');

module.exports = webpackMerge(commonConfig, {
    devtool: 'inline-source-map',

    output: {
        path: path.resolve('dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].chunk.js'
    },

    tslint: {
        emitErrors: false,
        failOnHint: false,
        resourcePath: 'src'
    },

    plugins: [
        new ExtractTextPlugin('[name].[hash].css'),
        new webpack.DefinePlugin({
            PLAYGROUND: JSON.stringify({
                env: 'DEVELOPMENT',
                build: commonConfig.meta
            })
        })
    ],

    devServer: {
        https: true,
        inline: true,
        compress: true,
        open: true,
        port: 3000,
        historyApiFallback: true,
        stats: 'minimal',
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        outputPath: path.resolve('dist')
    }
});