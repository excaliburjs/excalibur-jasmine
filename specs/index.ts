const testContext = require.context('.', true, /\.spec$/);

testContext.keys().forEach(testContext)