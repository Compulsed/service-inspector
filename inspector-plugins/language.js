const fs = require('fs');

const value = () => {
  if (fs.existsSync('./package.json')) {
    return 'JavaScript'
  }

  return null;
};

const run = (deps) => {
  return {
    columnName: 'Language',
    columnValue: value(deps),
  }
};

module.exports = { run };