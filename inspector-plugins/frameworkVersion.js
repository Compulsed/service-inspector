const fs = require('fs');

const value = ({dependencies: { YAML }}) => {
  try {
    const serverlessFrameworkFileString = fs
      .readFileSync('./serverless.yml')
      .toString()

    const serverlessYamlJSON = YAML
      .parse(serverlessFrameworkFileString);

    return serverlessYamlJSON.provider.runtime;
  } catch (err) {}

  return null;
};

const run = (deps) => {
  return {
    columnName: 'Framework Runtime',
    columnValue: value(deps),
  }
};

module.exports = { run };