const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        'webish': './build/index.js',
        'webish.min': './build/index.js'
    },
    mode: 'production',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: 'Webish'
    }
};