# Openfort Adapters

This repository hosts openfort adapters for your TypeScript framework. Our Adapters are built to make it as easy as possible to integrate Openfort in your application.

### Adapters

- [BetterAuth](./packages/openfort-betterauth)


### Deploying Adapters

1. To deploy the adapters, you need to create a new changeset. You can do this by running and follow the instructions in the terminal:

```bash
npx @changesets/cli
```

2. After you have created the changeset, you should create a pull request to the main branch. 
3. Once the pull request is merged, a new pull request will be created that will bump the version of the adapters.
4. Merge it to the main branch and the adapters will be published to npm.
