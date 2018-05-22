process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = (config) => {
    config.set({
        singleRun: true,
        frameworks: ['jasmine'],
        files: [
            '*.spec.ts',
            'test-images/*.png'
        ],
        mime: { 'text/x-typescript': ['ts','tsx'] },
        preprocessors: {
            "*.spec.ts": ["webpack"]
        },
        webpack: {
            mode: 'none',
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