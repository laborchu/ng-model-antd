import * as autoprefixer from 'autoprefixer';
import * as cssnano from 'cssnano';
import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as merge from 'merge-stream';
import * as util from 'gulp-util';
import * as filter from 'gulp-filter';
import { join } from 'path';

import Config from '../../config';
import { CssTask } from '../css_task';

const plugins = <any>gulpLoadPlugins();
const processors = [
  autoprefixer({
    browsers: Config.BROWSER_LIST
  })
];

processors.push(
  cssnano({
    discardComments: {removeAll: true},
    discardUnused: false, // unsafe, see http://goo.gl/RtrzwF
    zindex: false, // unsafe, see http://goo.gl/vZ4gbQ
    reduceIdents: false // unsafe, see http://goo.gl/tNOPv0
  })
);

const reportPostCssError = (e: any) => util.log(util.colors.red(e.message));


const appSCSSFiles = join(Config.NGV_SRC, '**', '*.scss');

/**
 * Execute the appropriate component-stylesheet processing method based on user stylesheet preference.
 */
function processComponentStylesheets() {
  return processComponentScss();
}

/**
 * Process scss files referenced from Angular component `styleUrls` metadata
 */
function processComponentScss() {
  return getSCSSFiles('process-component-scss', [appSCSSFiles])
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass(Config.getPluginConfig('gulp-sass')).on('error', plugins.sass.logError))
    .pipe(plugins.postcss(processors))
    .on('error', reportPostCssError)
    .pipe(plugins.sourcemaps.write('', {
      sourceMappingURL: (file: any) => {
        // write absolute urls to the map files
        return `${Config.APP_BASE}${file.relative}.map`;
      }
    }))
    .pipe(gulp.dest(Config.NGV_LIB_DEST));
}

/**
 + * Get SCSS Files to process
 + */
function getSCSSFiles(cacheName: string, filesToCompile: string[], filesToExclude: string[] = []) {
  let allFiles: string[] = filesToCompile.concat(filesToExclude);
  let filteredFiles: string[] = filesToCompile.concat(
    filesToExclude.map((path: string) => { return '!' + path; })
  );
  return gulp.src(allFiles)
    .pipe(plugins.cached(cacheName))
    .pipe(plugins.progeny())
    .pipe(filter(filteredFiles));
}

/**
 * Executes the build process, processing the HTML and CSS files.
 */
export =
  class BuildHtmlCss extends CssTask {

    shallRun(files: String[]) {
      return super.shallRun(files) || files.some(f => f.endsWith('.html'));
    }

    run() {
      return merge(processComponentStylesheets());
    }
  };
