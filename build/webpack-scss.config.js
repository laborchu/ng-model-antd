const path = require('path');
const fs = require('fs');

/**
 * Webpack Plugins
 */
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './lib/ngds.scss',
    output: { filename: './dist/lib/ngds.css'},
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                loaders: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin('./dist/lib/ngds.css'),
    ]
}