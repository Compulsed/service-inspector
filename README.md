# Microservice Inspector

### Get up and running

`node index.js print`

### Design goals
- Microservices should themselves describe what they are, should not be perscriptive about how they self identify
  - Knowing that most microservices have a similar layout how should this work?
    - Plugins exist in /inspector folder, link to sample project with common plugins?
    - Try and auto detect with some default values that come with the package?
- Should be able to be installed and ran without a package.json (through npmx), should be able to run in ruby projects just with a nodejs dependency

### Improvements
- Dry run command
- Debug statements
- Output data which was pushed to AirTable

### Unknowns
- How do we know which values are actively being updated?
- How should we manage replacing values when there is something on air table but not something locally?
- How should I manage dependencies? -- currently they're coming from the inspector project though this feels kind of wrong