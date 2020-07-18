const value = () => {
  return Date.now();
};

const run = () => {
  return {
    columnName: 'Last Synced',
    columnValue: value(),
  }
};

module.exports = { run };