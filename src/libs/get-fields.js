const fs = require('fs');

const dependencies = {
  YAML: require('yaml'),
  _: require('lodash'),
};

const getFields = () => {
  const runPlugins = pluginFileName =>
    require(`${process.cwd()}/inspector-plugins/` + pluginFileName)
    .run({ dependencies });

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

module.exports = { getFields };