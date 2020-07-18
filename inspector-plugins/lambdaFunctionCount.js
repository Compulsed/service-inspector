const fs = require('fs');

const value = ({dependencies: { YAML }}) => {
  try {
    const serverlessFrameworkFileString = fs
      .readFileSync('./serverless.yml')
      .toString()

    const serverlessYamlJSON = YAML
      .parse(serverlessFrameworkFileString);

    return Object.keys(serverlessYamlJSON.functions).length;
  } catch (err) {}

  return null;
};

const run = (deps) => {
  return {
    columnName: 'Lambda Function Count',
    columnValue: value(deps),
  }
};

module.exports = { run };