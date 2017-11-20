import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as util from 'gulp-util';
import { join } from 'path';
var gulpFile = require('gulp-file');
import Config from '../../config';
import { clean } from '../../utils';
import * as rimraf from 'rimraf';


var exec = require('child_process').exec;

export = () => {
  var pkgJson = require(Config.PACKAGE_JSON_PATH);
  var targetPkgJson:any = {};
  var fieldsToCopy:Array<string> = ['name','version', 'description', 'keywords', 'author', 'repository', 'license', 'bugs', 'homepage'];

  fieldsToCopy.forEach(function(field) { targetPkgJson[field] = pkgJson[field]; });
  targetPkgJson['main'] = `bundles/${targetPkgJson['name']}.umd.js`;
  targetPkgJson['module'] = 'index.js';
  targetPkgJson['typings'] = 'index.d.ts';
  targetPkgJson.peerDependencies = {};
  Object.keys(pkgJson.dependencies).forEach(function(dependency) {
      targetPkgJson.peerDependencies[dependency] = `^${pkgJson.dependencies[dependency]}`;
  });

  gulp.src([
    join(Config.NGV_LIB_DEST, 'src/**')
  ]).pipe(gulp.dest(Config.NGV_LIB_DEST));

  setTimeout(()=>{
     rimraf(join(Config.NGV_LIB_DEST, 'src'), e => {
        if (e) {
          util.log('Clean task failed with', e);
        } else {
          util.log('Deleted', util.colors.yellow(join(Config.NGV_LIB_DEST, 'src') || '-'));
        }
      });
    
  },3000);



  return gulp.src('README.md')
      .pipe(gulpFile('package.json', JSON.stringify(targetPkgJson, null, 2)))
      .pipe(gulp.dest(Config.NGV_LIB_DEST));

}

