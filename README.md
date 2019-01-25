Exchange front-end using Node and React
[![codecov](https://codecov.io/gh/GhostGroup/exchange-fe/branch/master/graph/badge.svg?token=thqzIMewEF)](https://codecov.io/gh/GhostGroup/exchange-fe)

## Features

Exchange is a [Next.js](https://github.com/zeit/next.js) powered Server-rendered React Application

* Server Rendering for SEO and Mobile performance
* [styled-components](https://www.styled-components.com/) for styling
* [React Storybook](https://github.com/storybooks/react-storybook) integration for Visual testing and display
* Webpack build system with Hot-Module Replacement (HMR)
* Testing Framework with [Jest](https://facebook.github.io/jest/) and [Enzyme](https://github.com/airbnb/enzyme)
* Linting and formatting with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)

## Storybook and Application URLs

You can view the application in acceptance at the follow URLs (VPN required)

* Storybook: http://exchange-fe-storybook-acceptance.internal-weedmaps.com/
* Application: https://exchange-acceptance.internal-weedmaps.com/
* UI Library: https://ui.weedmaps.com

## Installation

* Ensure you have an NPM account and are added to the @ghostgroup org.
* Run `npm login` to login and store your credential token in your `~/.npmrc` file
* Export the `NPM_TOKEN` variable in your shell of choice e.g. `NPM_TOKEN=<your_npm_token>` from the `~/.npmrc` file
* Ensure you are running a modern version of NodeJS >= 8.1.x
* From the repo directory: `npm install`
* Add a `.env` file to your project root with the following variables for the API urls e.g. -
  ```
  CORE_BASE_URL=https://acceptance.internal-weedmaps.com
  ```

## Run

Execute `yarn dev`, then hit [http://localhost:1620/](http://localhost:1620/)

You will also need to paste the contents of `example.cookie` into the value for the `mwm.userAccessToken` cookie, using your browser's Dev Tools.

## Linting

### ESLint & Prettier

We are using prettier as a plugin for eslint, so prettier format diffs show as auto-fixable errors to eslint. Ideally your editor should be configured to run eslint --fix on file save. See the "Editor Configuration" section for details.

To run eslint manually:

```
yarn lint
```

### Flow

To run Flow checks manually:

```
yarn flow check
```

### Precommit & Lint-Staged

In case of editor failure or misconfiguration, `eslint --fix` is also setup to be run across all staged files as a precommit hook using [lint-staged](https://github.com/okonet/lint-staged) and [husky](https://github.com/typicode/husky). This is intended to serve as a catch-all and prevent build failures, but to avoid surprises editor integration is recommended.

## Editor Configuration

### VS Code + ESLint plugin configuration:

```
  "eslint.autoFixOnSave": true
```

### WebStorm

Running `eslint --fix` on filesave: https://blog.jetbrains.com/webstorm/2016/08/using-external-tools/

## Tests

Tests are located at:

```
__tests__
    component.test.js
```

### Running the Tests

All the tests:

```
yarn test
```

Single test:

```
yarn test path/to/file.js
```

Update snapshots:

```
yarn test -u
```

### Code Coverage

Running the tests generates a new coverage report in the `coverage` folder

## Analyze Bundle Size

Webpack bundle analyzer is available by running
`yarn bundle-analyzer`. This will generate a production build and run the bundle size analyzer
web tool.

## Storybook

### Viewing Stories

To view the Storybook, simply run `yarn storybook`.

### Writing new Stories

Stories are essentially visual test cases for React components. To Write a new story, add a JS file in the same directory as the component. Stories will be dynamically loaded in `.storybook/config.js`.

Example:

```
components/button
├── button.stories.js
└── index.js
```

## Docker

Exchange FE is configured to run in a Docker container, but most developers just use `yarn dev` above.

To run the application in Docker:

* To build this DockerFile, you will need to have an authenticated .npmrc file in this directory. Add it by running cat ~/.npmrc > .npmrc
* Ensure you have docker installed - https://www.docker.com/products/overview
* Run
  ```
  LOG_LEVEL=DEBUG DEPLOY_ENVIRONMENT=acceptance docker-compose up --build
  ```
* Visit - `http://localhost`
* Visit - `http://localhost:6006` to see the storybook server
