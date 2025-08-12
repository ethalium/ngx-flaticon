const {deleteDirectory, createDirectory, npx} = require("./utils");
const {writeFileSync, readFileSync, cpSync} = require('fs');
const {join} = require('path');

const config = require('./config');

const main = {

  /**
   * Cleans up the project directories by deleting specified directories.
   *
   * This method removes the assets directory and temporary directory
   * as defined in the configuration settings to ensure a clean state.
   */
  clean: function() {
    deleteDirectory(config.output.assets);
    deleteDirectory(config.temp);
  },

  /**
   * Creates the directory structure required for the project.
   * This function sets up the necessary folder hierarchy based on the configured output paths
   * for SCSS files, webfont files, and data files.
   *
   * It utilizes `createDirectory` to create the following directories:
   * - The SCSS directory specified in `config.output.scss`.
   * - The webfonts directory specified in `config.output.webfonts`.
   * - The data directory specified in `config.output.data`.
   */
  createStructure: function() {
    createDirectory(config.temp());
    createDirectory(config.output.scss());
    createDirectory(config.output.webfonts());
    createDirectory(config.output.data());
  },

  downloadSources: function() {

    // clean temp
    this.clean();

    // create structure
    this.createStructure();

    // create paths
    const tempFile = config.temp('main.zip');
    const tempDir = config.temp('flaticon-icons-main');

    // download sources
    console.log(`Downloading sources from repository...`);
    npx('node-wget', 'https://github.com/ethalium/flaticon-icons/archive/refs/heads/main.zip', '-d', tempFile);

    // extract sources
    console.log(`Extracting sources...`);
    npx('extract-zip', tempFile, config.temp());

    // copy scss files to output
    console.log(`Copying scss files to output...`);
    cpSync(join(tempDir, 'dist/assets/flat-icons.scss'), config.output.assets('flat-icons.scss'));
    cpSync(join(tempDir, 'dist/assets/flat-icons.css'), config.output.assets('flat-icons.css'));
    cpSync(join(tempDir, 'dist/assets/scss'), config.output.scss(), {
      recursive: true,
    });

    // copy webfonts to output
    console.log(`Copying webfonts to output...`);
    cpSync(join(tempDir, 'dist/assets/webfonts'), config.output.webfonts(), {
      recursive: true
    });

    // copy data to output
    console.log(`Copying data to output...`);
    writeFileSync(config.output.data('flat-icon.data.ts'), readFileSync(join(tempDir, 'dist/data/icons.data.ts')).toString('utf-8').replace('./types.data', '../interfaces/flat-icon-types.interface'));
    cpSync(join(tempDir, 'dist/data/icons.interface.ts'), config.output.interfaces('flat-icon-types.interface.ts'));

    // clean sources
    this.clean();

  },

};

main.downloadSources();
