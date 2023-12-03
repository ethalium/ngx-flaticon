const packages = require('./packages');
const config = require('./config');

function createVariables(icons){
    console.log('Create variables.scss...');

    // set path of _icons.scss
    const file = packages.path.join(config.outputDir, 'scss', '_variables.scss');

    // create array of rows for file
    const rows = [];

    // create selectors
    if(config.styleSelectors.length){
        rows.push(`$fi-selectors: ("${config.styleSelectors.join('", "')}");`);
    }

    // create icons
    for(const [type, weights] of Object.entries(icons)){
        for(const [weight, icons] of Object.entries(weights)){
          rows.push(type === 'brands' ? `$fi-icons-${type}: (` : `$fi-icons-${type}-${weight}: (`);
          for(const [iconName, iconValue] of Object.entries(icons)){
            rows.push([' ', `"${iconName}": "\\${iconValue}",`]);
          }
          rows.push(');');
        }
    }

    // write content to fileSystem
    packages.fs.writeFileSync(file, rows.map(p => p.join ? p.join('') : p).join('\n'));

}

function createStyles(){
    console.log('Create styles...');
    for(let style of config.styles){
        console.log(`Create style ${style.name}.scss...`);

        // set path of _icons.scss
        const file = packages.path.join(config.outputDir, 'scss', `${style.name}.scss`);

        // create array of rows for file
        const rows = [];

        // create icons
        switch(style.name){
            case 'brands': {
                rows.push(...createStyleContentForIconsBranded(style));
                break;
            }
            default: {
                rows.push(...createStyleContentForIcons(style));
                break;
            }
        }

        // write content to fileSystem
        packages.fs.writeFileSync(file, rows.map(p => p.join ? p.join(' ') : p).join('\n'));
        packages.childProcess.execSync(`npx --yes cssfmt ${file}`);

    }
}

function createAnimationsStyle(){
  console.log('Create animations...');

  // set path of animations.scss
  const file = packages.path.join(config.outputDir, 'scss', `animations.scss`);

  // write content to fileSystem
  packages.fs.writeFileSync(file, `
    .fi-animation-beat::before {
      animation-name: fi-animation-beat;
      animation-delay: var(--fi-animation-delay, 0s);
      animation-direction: var(--fi-animation-direction, normal);
      animation-iteration-count: var(--fi-animation-iteration-count, infinite);
      animation-timing-function: var(--fi-animation-timing-function, ease-in-out);
    }

    @keyframes fi-animation-beat {
      0%, 90% { transform: scale(1); }
      45% { transform: scale(var(--fi-animation-beat-scale, 1.25)); }
    }

    .fi-animation-bounce::before {
      animation-name: fi-animation-bounce;
      animation-delay: var(--fi-animation-delay, 0s);
      animation-direction: var(--fi-animation-direction, normal);
      animation-duration: var(--fi-animation-duration, 1s);
      animation-iteration-count: var(--fi-animation-iteration-count, infinite);
      animation-timing-function: var(--fi-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
    }

    @keyframes fi-animation-bounce {
      0% { transform: scale(1, 1) translateY(0); }
      10% { transform: scale(var(--fi-animation-bounce-start-scale-x, 1.1), var(--fi-animation-bounce-start-scale-y, 0.9)) translateY(0); }
      30% { transform: scale(var(--fi-animation-bounce-jump-scale-x, 0.9), var(--fi-animation-bounce-jump-scale-y, 1.1)) translateY(var(--fi-animation-bounce-height, -0.5em)); }
      50% { transform: scale(var(--fi-animation-bounce-land-scale-x, 1.05), var(--fi-animation-bounce-land-scale-y, 0.95)) translateY(0); }
      57% { transform: scale(1, 1) translateY(var(--fi-animation-bounce-rebound, -0.125em)); }
      64% { transform: scale(1, 1) translateY(0); }
      100% { transform: scale(1, 1) translateY(0); }
    }

    .fi-animation-fade::before {
      animation-name: fi-animation-fade;
      animation-delay: var(--fi-animation-delay, 0s);
      animation-direction: var(--fi-animation-direction, normal);
      animation-duration: var(--fi-animation-duration, 1s);
      animation-iteration-count: var(--fi-animation-iteration-count, infinite);
      animation-timing-function: var(--fi-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
    }

    @keyframes fi-animation-fade {
      50% { opacity: var(--fi-animation-fade-opacity, 0.4); }
    }

    .fi-animation-beat-fade::before {
      animation-name: fi-animation-beat-fade;
      animation-delay: var(--fi-animation-delay, 0s);
      animation-direction: var(--fi-animation-direction, normal);
      animation-duration: var(--fi-animation-duration, 1s);
      animation-iteration-count: var(--fi-animation-iteration-count, infinite);
      animation-timing-function: var(--fi-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
    }

    @keyframes fi-animation-beat-fade {
      0%, 100% {
        opacity: var(--fi-animation-beat-fade-opacity, 0.4);
        transform: scale(1);
      }
      50% {
        opacity: 1;
        transform: scale(var(--fi-animation-beat-fade-scale, 1.125));
      }
    }

    .fi-animation-flip::before {
      animation-name: fi-animation-flip;
      animation-delay: var(--fi-animation-delay, 0s);
      animation-direction: var(--fi-animation-direction, normal);
      animation-duration: var(--fi-animation-duration, 1s);
      animation-iteration-count: var(--fi-animation-iteration-count, infinite);
      animation-timing-function: var(--fi-animation-timing, ease-in-out);
    }

    @keyframes fi-animation-flip {
      50% { transform: rotate3d(var(--fi-animation-flip-x, 0), var(--fi-animation-flip-y, 1), var(--fi-animation-flip-z, 0), var(--fi-animation-flip-angle, -180deg)); }
    }

    .fi-animation-shake::before {
      animation-name: fi-animation-shake;
      animation-delay: var(--fi-animation-delay, 0s);
      animation-direction: var(--fi-animation-direction, normal);
      animation-duration: var(--fi-animation-duration, 1s);
      animation-iteration-count: var(--fi-animation-iteration-count, infinite);
      animation-timing-function: var(--fi-animation-timing, linear);
    }

    @keyframes fi-animation-shake {
      0% { transform: rotate(-15deg); }
      4% { transform: rotate(15deg); }
      8%, 24% { transform: rotate(-18deg); }
      12%, 28% { transform: rotate(18deg); }
      16% { transform: rotate(-22deg); }
      20% { transform: rotate(22deg); }
      32% { transform: rotate(-12deg); }
      36% { transform: rotate(12deg); }
      40%, 100% { transform: rotate(0deg); }
    }

    .fi-animation-spin::before {
      animation-name: fi-animation-spin;
      animation-delay: var(--fi-animation-delay, 0s);
      animation-direction: var(--fi-animation-direction, normal);
      animation-duration: var(--fi-animation-duration, 2s);
      animation-iteration-count: var(--fi-animation-iteration-count, infinite);
      animation-timing-function: var(--fi-animation-timing, linear);
    }

    .fi-animation-spin-reverse::before {
      --fi-animation-direction: reverse;
    }

    .fi-animation-pulse::before,
    .fi-animation-spin-pulse::before {
      animation-name: fi-animation-spin;
      animation-direction: var(--fi-animation-direction, normal);
      animation-duration: var(--fi-animation-duration, 1s);
      animation-iteration-count: var(--fi-animation-iteration-count, infinite);
      animation-timing-function: var(--fi-animation-timing, steps(8));
    }

    @keyframes fi-animation-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `);

  // format styles
  packages.childProcess.execSync(`npx --yes cssfmt ${file}`);

}

function createIndex() {
    console.log('Create index file...');
    packages.fs.writeFileSync(packages.path.join(config.outputDir, 'flat-icons.scss'), [
        '@import "scss/regular";',
        '@import "scss/solid";',
        '@import "scss/bold";',
        '@import "scss/brands";',
        '@import "scss/animations";',
    ].join('\n'))
}

function createStyleContentForIcons(style) {

    // set short name of styles
    const types = {
        'rounded': 'r',
        'straight': 's'
    };
    const shortName = {
        'regular': 'r',
        'solid': 's',
        'bold': 'b',
    };

    // create rows
    const rows = [];

    // import icons
    rows.push('@use "variables" as FlatIconVariables;', '');

    // create font face
    for(let type of Object.keys(types)){
        rows.push(`
            @font-face {
              font-family: "${style.fontName}-${type}";
              src: url("../webfonts/${style.fontName}-${type}.eot#iefix") format("embedded-opentype"), url("../webfonts/${style.fontName}-${type}.woff2") format("woff2"), url("../webfonts/${style.fontName}-${type}.woff") format("woff");
            }
        `);
    }

    // create base class
    for(const [type, short] of Object.entries(types)){
        rows.push(`
            @each $selector in FlatIconVariables.$fi-selectors {
                #{$selector}[class^="fi-${shortName[style.name]}${short}-"]:before,
                #{$selector}[class*="fi-${shortName[style.name]}${short}-"]:before {
                  display: block;
                  font-family: ${style.fontName}-${type} !important;
                  font-style: normal;
                  font-weight: normal !important;
                  font-variant: normal;
                  text-transform: none;
                  line-height: 1;
                  -webkit-font-smoothing: antialiased;
                  -moz-osx-font-smoothing: grayscale;
                }
            }
        `);
    }

    // create icons
    for(const [type, short] of Object.entries(types)){
        rows.push(`
        @each $iconName, $iconValue in FlatIconVariables.$fi-icons-${type}-${style.name} {
            .fi-${shortName[style.name]}${short}-#{$iconName}:before {
                content: $iconValue;
            }
        }
    `);
    }

    // return rows
    return rows;

}

function createStyleContentForIconsBranded(style) {

    // create rows
    const rows = [];

    // import icons
    rows.push('@use "variables" as FlatIconVariables;', '');

    // create font face
    rows.push(`
        @font-face {
          font-family: "${style.fontName}";
          src: url("../webfonts/${style.fontName}.eot#iefix") format("embedded-opentype"), url("../webfonts/${style.fontName}.woff2") format("woff2"), url("../webfonts/${style.fontName}.woff") format("woff");
        }
    `);

    // create base class
    rows.push(`
        @each $selector in FlatIconVariables.$fi-selectors {
            #{$selector}[class^="fi-${style.name}-"]:before,
            #{$selector}[class*="fi-${style.name}-"]:before {
              font-family: ${style.fontName} !important;
              font-style: normal;
              font-weight: normal !important;
              font-variant: normal;
              text-transform: none;
              line-height: 1;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
        }
    `);

    // create icons
    rows.push(`
        @each $iconName, $iconValue in FlatIconVariables.$fi-icons-brands {
            .fi-${style.name}-#{$iconName}:before {
                content: $iconValue;
            }
        }
    `);

    // return rows
    return rows;

}

function createStructure(webfonts){
    // delete output dir if exists
    if(packages.fs.existsSync(config.outputDir)){
        packages.fs.rmSync(config.outputDir, { recursive: true });
    }

    // create folders
    packages.fs.mkdirSync(config.outputDir, { recursive: true });
    packages.fs.mkdirSync(packages.path.join(config.outputDir, 'webfonts'), { recursive: true });
    packages.fs.mkdirSync(packages.path.join(config.outputDir, 'scss'), { recursive: true });

    // copy webfonts
    for(let webfont of webfonts){
        packages.fs.copyFileSync(webfont, packages.path.join(config.outputDir, 'webfonts', packages.path.basename(webfont)));
    }
}

module.exports = {
    create: (icons, webfonts) => {
      createStructure(webfonts);
      createVariables(icons);
      createStyles();
      createAnimationsStyle();
      createIndex();
    }
}
