// imports
const packages = require('./packages');
const config = require('./config');

// download repository
const repository = require('./repository-downloader').download();

// get icons
const icons = require('./style-parser').getIcons(repository.style);

// create icons
require('./style-creator').create(icons, repository.webfonts);

// create data
require('./data-creator').create(icons);

// delete temp dir
packages.fs.rmSync(config.tempDir, { recursive: true });
