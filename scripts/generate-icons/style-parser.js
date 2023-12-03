const packages = require('./packages');

function extractIcons(styleFile, regex) {

    // get content of styleFile
    const style = packages.fs.readFileSync(styleFile).toString();

    // find icons
    const foundIcons = style.matchAll(regex);

    // define object for icons
    const icons = {};

    // add icons to object
    let row;
    while (row = foundIcons.next()) {
        if(row.value && row.value.length > 2){
            const [ iconName, iconValue ] = [ row.value[row.value.length - 2], row.value[row.value.length - 1] ];
            if(iconValue && iconName && !icons[iconName]){
               icons[iconName] = iconValue.replace('\\', '');
            }
        }
        if(row.done) break;
    }

    // return icons
    return icons;

}

module.exports = {
    getIcons: (styleFile) => ({
        straight: {
            regular: extractIcons(styleFile, new RegExp(/.fi-rs-(.*):before {\n\s+content: "(.*)";\n}/, 'g')),
            solid: extractIcons(styleFile, new RegExp(/.fi-ss-(.*):before {\n\s+content: "(.*)";\n}/, 'g')),
            bold: extractIcons(styleFile, new RegExp(/.fi-bs-(.*):before {\n\s+content: "(.*)";\n}/, 'g')),
        },
        rounded: {
            regular: extractIcons(styleFile, new RegExp(/.fi-rr-(.*):before {\n\s+content: "(.*)";\n}/, 'g')),
            solid: extractIcons(styleFile, new RegExp(/.fi-sr-(.*):before {\n\s+content: "(.*)";\n}/, 'g')),
            bold: extractIcons(styleFile, new RegExp(/.fi-br-(.*):before {\n\s+content: "(.*)";\n}/, 'g')),
        },
        brands: {
            regular: extractIcons(styleFile, new RegExp(/.fi-(brands-(.*)):before {\n\s+content: "(.*)";\n}/, 'g'))
        }
    })
}
