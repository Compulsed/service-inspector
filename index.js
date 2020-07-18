const fs = require('fs');
const { program } = require('commander');

const Airtable = require('airtable');

const dependencies = {
  YAML: require('yaml'),
  _: require('lodash'),
};

const getFields = () => {
  const runPlugins = pluginFileName =>
    require(`${process.cwd()}/inspector-plugins/` + pluginFileName)
    .run(dependencies);

  const reducePluginOutput = (acc, { columnName, columnValue }) => {
    const getUpdateObjectWhenValueExists = () =>
      (columnValue !== null && columnValue !== undefined)
        ? { [columnName]: columnValue }
        : {};

    return Object.assign({}, acc, getUpdateObjectWhenValueExists());
  };

  const fields = fs.readdirSync('./inspector-plugins')
    .map(runPlugins)
    .reduce(reducePluginOutput, {});
  
  return fields;
};

const update = async (airtableTableName, commandArgs) => {
  try {
    const microServiceTable = new Airtable({ apiKey: commandArgs.airtableApiKey })
    .base(commandArgs.airtableBaseId)(airtableTableName)

    const updateConfiguration = [
      {
        id: commandArgs.airtableRowId,
        fields: getFields()
      }
    ];

    await microServiceTable
      .update(updateConfiguration);

    console.log('Done ⚡')
  } catch (err) {
    console.error('🔥');
    console.error(err);
  }
}

const print = async () => {
  try {
    const fields = getFields()
     
    console.log(JSON.stringify(fields, null, 2));

    console.log('Done ⚡')
  } catch (err) {
    console.error('🔥');
    console.error(err);
  }
}

// -- cli

/*
  node inspector/index.js
    update Microservices
    --airtable-base-id appnEws1PUhekz5jh
    --airtable-api-key key1111111111111
    --airtable-row-id recTrwiBViF1PS6vm
*/

program
  .command('update <airtableTableName>')
  .description('Updates microservice information within AirTable')
  .option('-d, --debug', 'output extra debugging')
  .requiredOption('-b, --airtable-base-id <id>', 'appnEws1PUhekz5jh - Found at: https://airtable.com/appnEws1PUhekz5jh/api/docs#curl/introduction')
  .requiredOption('-k, --airtable-api-key <key>', 'Get your users\' Api Key here:  https://airtable.com/account')
  .requiredOption('-r, --airtable-row-id <rowId>', 'Found by expanding the row of your microservice')
  .action(update);

program
  .command('print')
  .description('Shows all of the detected values')
  .action(print);

program.version('0.0.1');

program.parse(process.argv);