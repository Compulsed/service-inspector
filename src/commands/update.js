const { program } = require('commander');

const { getFields } = require('../libs/get-fields');

const Airtable = require('airtable');
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

program
  .command('update <airtableTableName>')
  .description('Updates microservice information within AirTable')
  .option('-d, --debug', 'output extra debugging')
  .requiredOption('-b, --airtable-base-id <id>', 'appnEws1PUhekz5jh - Found at: https://airtable.com/appnEws1PUhekz5jh/api/docs#curl/introduction')
  .requiredOption('-k, --airtable-api-key <key>', 'Get your users\' Api Key here:  https://airtable.com/account')
  .requiredOption('-r, --airtable-row-id <rowId>', 'Found by expanding the row of your microservice')
  .action(update);