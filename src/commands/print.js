const { program } = require('commander');

const { getFields } = require('../libs/get-fields');

const print = async () => {
  try {
    const fields = getFields();
     
    console.log(JSON.stringify(fields, null, 2));

    console.log('Done ⚡')
  } catch (err) {
    console.error('🔥');
    console.error(err);
  }
}

program
  .command('print')
  .description('Shows all of the detected values')
  .action(print);