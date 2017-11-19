import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as util from 'gulp-util';
import { join } from 'path';
var gulpFile = require('gulp-file');
import Config from '../../config';

var exec = require('child_process').exec;

export = () => {
  var pkgJson = require(Config.PACKAGE_JSON_PATH);
  var targetPkgJson:any = {};
  var fieldsToCopy:Array<string> = ['version', 'description', 'keywords', 'author', 'repository', 'license', 'bugs', 'homepage'];

  targetPkgJson['name'] = 'angular-ngv';
  fieldsToCopy.forEach(function(field) { targetPkgJson[field] = pkgJson[field]; });
  targetPkgJson['main'] = 'bundles/angular-ngv.umd.js';
  targetPkgJson['module'] = 'index.js';
  targetPkgJson['typings'] = 'index.d.ts';
  targetPkgJson.peerDependencies = {};
  Object.keys(pkgJson.dependencies).forEach(function(dependency) {
      targetPkgJson.peerDependencies[dependency] = `^${pkgJson.dependencies[dependency]}`;
  });

  return gulp.src('README.md')
      .pipe(gulpFile('package.json', JSON.stringify(targetPkgJson, null, 2)))
      .pipe(gulp.dest(Config.NGV_LIB_DEST));

}

