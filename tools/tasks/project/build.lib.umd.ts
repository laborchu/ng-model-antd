import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as util from 'gulp-util';
var webpack = require('webpack');


function webpackCallBack(taskName:any, gulpDone:any) {
  return function(err:any, stats:any) {
    if (err) throw new util.PluginError(taskName, err);
    util.log(`[${taskName}]`, stats.toString());
    gulpDone();
  }
}

/**
 * Executes the build process, transpiling the TypeScript files (except the spec and e2e-spec files) for the development
 * environment.
 */
export = (cb:any) => {
  function ngExternal(ns:any) {
    var ng2Ns = `@angular/${ns}`;
    return {root: ['ng', ns], commonjs: ng2Ns, commonjs2: ng2Ns, amd: ng2Ns};
  }

  function rxjsExternal(context:any, request:any, cb:any) {
    if (/^rxjs\/add\/observable\//.test(request)) {
      return cb(null, {root: ['Rx', 'Observable'], commonjs: request, commonjs2: request, amd: request});
    } else if (/^rxjs\/add\/operator\//.test(request)) {
      return cb(null, {root: ['Rx', 'Observable', 'prototype'], commonjs: request, commonjs2: request, amd: request});
    } else if (/^rxjs\//.test(request)) {
      return cb(null, {root: ['Rx'], commonjs: request, commonjs2: request, amd: request});
    }
    cb();
  }

  webpack(
      {
        entry: './dist/tmp/temp/index.js',
        output: { filename: 'dist/lib/bundles/ng-model-antd.umd.js', library: 'ngb', libraryTarget: 'umd' },
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
      },
      webpackCallBack('webpack', cb));
}

