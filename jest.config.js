const path = require('path');
const config = require('@folio/jest-config-stripes');

// stripes-components imports the ES module sources of keyboardjs (`keyboardjs/lib/keyboard`),
// so they have to be transformed as well.
const transformIgnorePatterns = [
  config.transformIgnorePatterns[0].replace(')', '|keyboardjs)'),
];

module.exports = {
  ...config,
  setupFiles: [
    ...config.setupFiles,
    path.join(__dirname, './test/jest/setupFiles.js'),
  ],
  transformIgnorePatterns,
};
