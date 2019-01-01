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

function root(args) {
    var _root = path.resolve(__dirname);
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}

function ngExternal(ns) {
    var ng2Ns = `@angular/${ns}`;
    return { root: ['ng', ns], commonjs: ng2Ns, commonjs2: ng2Ns, amd: ng2Ns };
}

function rxjsExternal(context, request, cb) {
    if (/^rxjs\/add\/observable\//.test(request)) {
        return cb(null, { root: ['Rx', 'Observable'], commonjs: request, commonjs2: request, amd: request });
    } else if (/^rxjs\/add\/operator\//.test(request)) {
        return cb(null, { root: ['Rx', 'Observable', 'prototype'], commonjs: request, commonjs2: request, amd: request });
    } else if (/^rxjs\//.test(request)) {
        return cb(null, { root: ['Rx'], commonjs: request, commonjs2: request, amd: request });
    }
    cb();
}

module.exports = {
    entry: './dist/lib/index.js',
    output: { filename: './dist/lib/bundles/ng-model-antd.umd.js', library: 'ngb', libraryTarget: 'umd' },
    devtool: 'source-map',
    externals: [
        {
            '@angular/core': ngExternal('core'),
            '@angular/common': ngExternal('common'),
            '@angular/forms': ngExternal('forms'),
            '@angular/animations': ngExternal('animations'),
            '@angular/cdk': ngExternal('cdk'),
            'ng-zorro-antd': 'ng-zorro-antd',
            'ngx-umeditor': 'ngx-umeditor',
            'ng2-validation': 'ng2-validation',
            'ngx-webuploader': 'ngx-webuploader'
        },
        rxjsExternal
    ]
}