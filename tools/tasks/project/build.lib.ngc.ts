import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as util from 'gulp-util';
import { join } from 'path';

var exec = require('child_process').exec;

export = (cb:any) => {
  exec('./node_modules/.bin/ngc -p src/tsconfig-es6.json', (e:any) => {
    if (e) console.log(e);
    cb();
  }).stdout.on('data', function(data:any) { 
    console.log(data); 
  });

}

