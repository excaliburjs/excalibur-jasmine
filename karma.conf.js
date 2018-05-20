process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = (config) => {
    config.set({
        frameworks: ['jasmine', 'karma-typescript'],
        files: [
            '*.ts'
        ],
        preprocessors: {
            "*.ts": "karma-typescript"
        },
        karmaTypescriptConfig: {
            compilerOptions: {
                sourceMap: true,
                outDir: './dist',
                lib: [
                    "es2017", "dom"
                ]
            }
        },
        reporters: ['progress'],
        browsers: ['ChromeHeadless_with_debug'],
        customLaunchers: {
            ChromeHeadless_with_debug : {
                base: 'Chrome',
                flags: [
                    '--remote-debugging-port=9334',
                    '--no-sandbox'
               ]
            }
        }
    });
}