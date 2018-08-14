var path = require('path');

var srcPath = path.resolve(__dirname, 'src');
var destinationPath = path.resolve(__dirname, 'build');

module.exports = {
    mode: "development",
    entry: path.resolve(srcPath, 'pixel.js'),
    output: {
        path: destinationPath,
        filename: 'pixel.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/, /\.idea/],
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: ['env']
                }
            },
        ],
    }
};
