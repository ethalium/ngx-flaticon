const packages = require('./packages');
const config = require('./config');

module.exports = {
  create: (icons) => {

    // create data directory if not exists
    if(!packages.fs.existsSync(packages.path.dirname(config.outputDataFile))){
      packages.fs.mkdirSync(packages.path.dirname(config.outputDataFile), {
        recursive: true,
        mode: 0o775,
      });
    }

    // create data file
    packages.fs.writeFileSync(config.outputDataFile, `export const FLAT_ICONS = ${JSON.stringify(icons, null, 2)}`);

  }
}
