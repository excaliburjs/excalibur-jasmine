const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require("path");

module.exports = {
    entry: './index.ts',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'index.js',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader'}
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                './matcher-types.d.ts',
                './index.d.ts',
                './convert.d.ts'
            ]
        })
    ]
}