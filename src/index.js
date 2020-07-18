#! /usr/bin/env node

const { program } = require('commander');

require('./commands/print');
require('./commands/update');

program.version('0.0.6');

program.parse(process.argv);