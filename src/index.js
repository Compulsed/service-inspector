const { program } = require('commander');

require('./commands/print');
require('./commands/update');

program.version('0.0.1');

program.parse(process.argv);