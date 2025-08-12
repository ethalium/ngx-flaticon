const { resolve, join } = require('path');

const PROJECT_ROOT = resolve(__dirname, '../../');
const PACKAGE_ROOT = join(PROJECT_ROOT, 'projects/ngx-flaticon');

module.exports = {

  /**
   * The output object provides utility methods to construct file paths for various resources
   * relative to the project root.
   *
   * @property {Function} assets - Constructs a path to the `assets` directory by appending the provided sub-paths.
   * @property {Function} scss - Constructs a path to the `assets/scss` directory by appending the provided sub-paths.
   * @property {Function} webfonts - Constructs a path to the `assets/webfonts` directory by appending the provided sub-paths.
   * @property {Function} data - Constructs a path to the `src/lib/data` directory by appending the provided sub-paths.
   */
  output: {
    assets: (...paths) => join(PACKAGE_ROOT, 'assets', ...paths),
    scss: (...paths) => join(PACKAGE_ROOT, 'assets/scss', ...paths),
    webfonts: (...paths) => join(PACKAGE_ROOT, 'assets/webfonts', ...paths),
    data: (...paths) => join(PACKAGE_ROOT, 'src/lib/data', ...paths),
    interfaces: (...paths) => join(PACKAGE_ROOT, 'src/lib/interfaces', ...paths),
  },

  /**
   * Constructs a temporary file path by joining the base `.tmp` directory
   * with the specified paths.
   *
   * @param {...string} paths - One or more path segments to be appended to the `.tmp` directory.
   * @returns {string} The resulting file path in the `.tmp` directory.
   */
  temp: (...paths) => join(__dirname, '.tmp', ...paths),

}
