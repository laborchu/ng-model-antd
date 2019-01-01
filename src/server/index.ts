import * as http from 'http';
let express = require('express');
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as compression from 'compression';
import cookieParser = require('cookie-parser');
import * as dotenv from 'dotenv';
import * as webpack from 'webpack';
let webpackDevMiddleware = require('webpack-dev-middleware-hard-disk');
import * as webpackHotMiddleware from 'webpack-hot-middleware';

//config env
dotenv.config({ path: path.join(__dirname, `./.env.${process.env.ENV}`) });

var app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.text());
app.use(compression());

if (process.env.ENV == 'dev') {
    let webpackDevConfig = require('../../webpack.config.js');
    var compiler = webpack(webpackDevConfig);
    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackDevConfig.output.publicPath,
        stats: {
            colors: true
        }
    }));
    app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, '../../dist')));
app.use(express.static(path.join(__dirname, '../../')));

//初始化路由
// var renderIndex = (req: any, res: any) => {
//     res.sendFile(path.resolve(__dirname, '../../dist' + '/index.html'));
// };
// app.get('/*', renderIndex);


app.listen(process.env.PORT, () => {
    console.log('App is listening on port:' + process.env.PORT);
});

process.on('uncaughtException', function (err: any) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack);
});