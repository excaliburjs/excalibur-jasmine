process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = (config) => {
    config.set({
        singleRun: true,
        frameworks: ['jasmine'],
        files: [
            'specs/index.ts',
            { pattern: 'test-images/*.png', included: false, served: true }
        ],
        mime: { 'text/x-typescript': ['ts','tsx'] },
        preprocessors: {
            "specs/index.ts": ["webpack", 'sourcemap']
        },
        webpack: {
            devtool: 'inline-source-map',
            resolve: {
                extensions: ['.ts', '.js']
            },
            module: {
                rules: [
                    { test: /\.ts$/, loader: 'ts-loader'}
                ]
            }
        },
        reporters: ['progress'],
        browsers: ['ChromeHeadless_with_debug'],
        customLaunchers: {
            ChromeHeadless_with_debug: {
                base: 'ChromeHeadless',
                flags: [
                    '--remote-debugging-port=9334',
                    '--no-sandbox'
               ]
            },
            Chrome_with_debug: {
                base: 'Chrome',
                flags: [
                    '--remote-debugging-port=9334',
                    '--no-sandbox'
               ]
            }
        }
    });
}