import { watch } from '../../utils';
import Config from '../../config';
/**
 * Executes the build process, watching for file changes and rebuilding the development environment.
 */
export = watch('build.dev',Config.NGV_SRC);
