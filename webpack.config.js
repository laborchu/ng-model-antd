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

var publicPath = `http://localhost:${process.env.PORT}/`;
function root(args) {
    var _root = path.resolve(__dirname);
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}

let entry = {
    'polyfills': root('./src/client/app/polyfills.ts'),
    'vendor': root('./src/client/app/vendor.ts')
}
let devtool = 'eval-source-map';
let plugins = [];
if (process.env.ENV == "dev") {
    var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
    entry['app'] = [root('./src/client/app/main.ts'), hotMiddlewareScript];
    plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
    entry['app'] = root('./src/client/app/main.ts');
    publicPath = "/";
    devtool = false;
    plugins.push(new UglifyJSPlugin());
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            'ENV': JSON.stringify(process.env.ENV)
        }
    }))
}

module.exports = {
    devtool: devtool,
    entry: entry,
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            "@angular/core": '@angular/core/bundles/core.umd.min.js',
            "@angular/router": '@angular/router/bundles/router.umd.min.js',
            "@angular/form": '@angular/form/bundles/form.umd.min.js',
            "@angular/platform-browser/animations": root("./node_modules/@angular/platform-browser/bundles/platform-browser-animations.umd.min.js"),
            "@angular/platform-browser": '@angular/platform-browser/bundles/platform-browser.umd.min.js',
            "@angular/platform-browser-dynamic": '@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js',
            // "ng-zorro-antd": 'ng-zorro-antd/bundles/ng-zorro-antd.umd.js',
            "ngx-umeditor": 'ngx-umeditor/bundles/umeditor.umd.js',
            "rxjs/Rx": 'rxjs/bundles/Rx.min.js',
            '*': root('./node_modules/*')
        }
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'js/[name].[hash:8].js',
        publicPath: publicPath,
    },
    devServer: {
        historyApiFailback: true
    },
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
                loaders: ['raw-loader', 'sass-loader']
            },
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: root('./src/client/tsconfig.json'),
                            transpileOnly: true,
                            happyPackMode: true
                        }
                    }, 'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        ...plugins,
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin('[name].[hash].css'),
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(@angular|esm5)/,
            root('./src/client/app'), // location of your src
            {} // a map of your routes
        ),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        new CopyWebpackPlugin([
            {
                context: root('./src/client/assets'),
                from: "**/*",
                to: "assets",
            }
        ]),
        new HtmlWebpackPlugin({
            template: root('./src/client/index.html')
        })
    ],
}