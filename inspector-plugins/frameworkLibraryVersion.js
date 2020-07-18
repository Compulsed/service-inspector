const fs = require('fs');

const value = () => {
  try {
    const packageJsonString = fs
      .readFileSync('./package.json')
      .toString()

    const packageJSON = JSON.parse(packageJsonString)

    return packageJSON.devDependencies.serverless;
  } catch (err) {}

  return null;
};

const run = (deps) => {
  return {
    columnName: 'Framework Library Version',
    columnValue: value(deps),
  }
};

module.exports = { run };