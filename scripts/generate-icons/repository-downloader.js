const packages = require('./packages');
const config = require('./config');

function clean() {
    // delete tempDir if exists
    if(packages.fs.existsSync(config.tempDir)){
        packages.fs.rmSync(config.tempDir, { recursive: true });
    }

    // delete outputDir if exists
    if(packages.fs.existsSync(config.outputDir)){
        packages.fs.rmSync(config.outputDir, { recursive: true });
    }

    // create folders
    // fs.mkdirSync(tempDir, { recursive: true });
    packages.fs.mkdirSync(packages.path.join(config.outputDir, 'webfonts'), { recursive: true });
    packages.fs.mkdirSync(packages.path.join(config.outputDir, 'scss'), { recursive: true });

}

function createStructure(){
    console.log('Create icon folder structure...');

    // create tempDir if not exists
    if(!packages.fs.existsSync(config.tempDir)){
        packages.fs.mkdirSync(config.tempDir);
    }

    // create tempDir/webfonts if not exists
    if(!packages.fs.existsSync(packages.path.join(config.tempDir, 'webfonts'))){
        packages.fs.mkdirSync(packages.path.join(config.tempDir, 'webfonts'));
    }

    // create outputDir if not exists
    if(!packages.fs.existsSync(config.outputDir)){
        packages.fs.mkdirSync(config.outputDir);
    }

    // create outputDir/scss if not exists
    if(!packages.fs.existsSync(packages.path.join(config.outputDir, 'scss'))){
        packages.fs.mkdirSync(packages.path.join(config.outputDir, 'scss'), { recursive: true });
    }

    // create outputDir/webfonts if not exists
    if(!packages.fs.existsSync(packages.path.join(config.outputDir, 'webfonts'))){
        packages.fs.mkdirSync(packages.path.join(config.outputDir, 'webfonts'), { recursive: true });
    }
}

function downloadRepository(){
  // clean everything
  clean();

  // create structure
  createStructure();

  // download and extract source
  console.log('Download repository...');
  packages.childProcess.execSync(`npx --yes node-wget https://github.com/freepik-company/flaticon-uicons/archive/refs/heads/main.zip -d ${packages.path.join(config.tempDir, 'main.zip')}`);
  console.log('Extract repository...');
  packages.childProcess.execSync(`npx --yes extract-zip ${packages.path.join(config.tempDir, 'main.zip')} ${packages.path.join(config.tempDir, 'main')}`);

  // merge css
  console.log('Merge raw styles...');
  for(let cssFile of packages.glob.globSync('**/*.css', { cwd: packages.path.join(config.tempDir, 'main') })){
      const mergedFileContent = packages.fs.existsSync(packages.path.join(config.tempDir, 'flat-icon.css')) ? packages.fs.readFileSync(packages.path.join(config.tempDir, 'flat-icon.css')).toString() : '';
      const cssFileContent = packages.fs.readFileSync(packages.path.join(packages.path.join(config.tempDir, 'main'), cssFile)).toString();
      packages.fs.writeFileSync(packages.path.join(config.tempDir, 'flat-icon.css'), `${mergedFileContent}${cssFileContent}\n`);
  }

  // format merged css
  console.log('Format raw styles...');
  packages.childProcess.execSync(`npx --yes cssfmt ${packages.path.join(config.tempDir, 'flat-icon.css')}`);

  // copy webfonts to temp dir
  console.log('Copy webfonts to directory...');
  for(let webfontFile of packages.glob.globSync('**/*.{eot,woff,woff2}', { cwd: packages.path.join(config.tempDir, 'main') })){
      webfontFile = packages.path.join(config.tempDir, 'main', webfontFile);
      packages.fs.copyFileSync(webfontFile, packages.path.join(config.tempDir, 'webfonts', packages.path.basename(webfontFile)))
  }

  // delete folders and files
  console.log('Delete temporary files...');
  packages.fs.rmSync(packages.path.join(config.tempDir, 'main'), { recursive: true });
  packages.fs.rmSync(packages.path.join(config.tempDir, 'main.zip'));

}

function getRepository(){
    // download repository
    downloadRepository();

    // return data
    return {
        webfonts: packages.glob.globSync('**/*', { cwd: packages.path.join(config.tempDir, 'webfonts') }).map(w => packages.path.join(config.tempDir, 'webfonts', w)),
        style: packages.path.join(config.tempDir, 'flat-icon.css')
    }
}

module.exports = {
    download: () => getRepository(),
}
