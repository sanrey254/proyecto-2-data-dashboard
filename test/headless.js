global.window = global;
global.assert = require('chai').assert;
global.fixtures = {
  users: require('../data/laboratoria.json'),
};
require('../src/data.js');
require('./data.spec.js');
