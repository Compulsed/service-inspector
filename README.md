# 🔎 Microservice Inspector 🔎

<p align="center">
  <a href="https://yarnpkg.com/">
    <img alt="Yarn" src="https://raw.githubusercontent.com/Compulsed/service-inspector/master/inspector.png?raw=true" width="546">
  </a>
</p>

### Purpose
To push information about Microservices to AirTable after CI deployment

### Design goals
- Microservices should themselves describe what they are, should not be perscriptive about how they self identify
- Should be able to be installed and ran without a package.json (through npx), should be able to run in ruby projects just with a nodejs dependency

### Get up and running

Service inspector uses a plugin based architecture and runs every JavaScript file in a directory specifically called `inspector-plugins` within the current working directory

Plugins must expose a `run` method and return an object which matches the following format:

```js
const run = () => {
  return {
    columnName: 'Last Synced',
    columnValue: Date.now(),
  }
};

module.exports = { run };
```

Once set up you can run to see what the outputs will be:
```sh
npx service-inspector print
```

To update AirTable with those values run:
```sh
npx service-inspector update --airtable-api-key <API-KEY> --airtable-base-id appnEws1PUhekz5jh  --airtable-table-name Microservices --airtable-row-id recTrwiBViF1PS6vm
```


### Improvements
- [x] Output data which was pushed to AirTable (Print command)
- [ ] Debug statements
- [ ] Tests

### Unknowns
- How do we know which values are actively being updated?
- How should we manage replacing values when there is something on air table but not something locally?
- How should I manage dependencies? -- currently they're coming from the inspector project though this feels kind of wrong