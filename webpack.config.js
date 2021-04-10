const path = require('path');

module.exports = {
  entry: './public/scripts/array.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/scripts'),
  },
};
