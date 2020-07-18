const value = () => {
  return Date.now();
};

const run = (deps) => {
  return {
    columnName: 'Last Synced',
    columnValue: value(deps),
  }
};

module.exports = { run };