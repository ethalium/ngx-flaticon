const path = require('path');

module.exports = {
    outputDir: path.resolve('./projects/ng-flaticon/assets'),
    outputDataFile: path.resolve('./projects/ng-flaticon/src/lib/data/flat-icon.data.ts'),
    tempDir: path.resolve('./scripts/tmp'),
    styleSelectors: ['.fi'],
    styles: [
        {
            name: 'regular',
            fontName: 'uicons-regular',
        },
        {
            name: 'solid',
            fontName: 'uicons-solid',
        },
        {
            name: 'bold',
            fontName: 'uicons-bold',
        },
        {
            name: 'brands',
            fontName: 'uicons-brands',
        }
    ]
}
