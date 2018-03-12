const path = require('path');
module.exports = {
    entry: './build/index.js',
    mode: 'production',
    output: {
        filename: 'webish.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'Webish'
    }
};