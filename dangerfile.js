// @flow
import { schedule, danger } from 'danger';
import {
  checkForLockfileDiff,
  checkForNewDependencies,
} from 'danger-plugin-yarn';
import wm, { bigSnapshots, resRedirect } from '@ghostgroup/danger-plugins';
import flow from 'danger-plugin-flow';
/* eslint-enable import/no-extraneous-dependencies */

// yarn checks
schedule(
  danger.git.JSONDiffForFile('package.json').then(packageDiff => {
    checkForLockfileDiff(packageDiff);
    return checkForNewDependencies(packageDiff);
  }),
);

// Check for Flow being added new files or warn on modified files
schedule(
  flow({
    modified: 'warn',
    created: 'warn',
    blacklist: ['flow-typed/**/*.js', '*next.config.js'],
  }),
);

// Run the default WM danger plugins
wm();

// Warn about individual snapshots over 50 lines. Not failing for now …
schedule(bigSnapshots(50, false));

// Warn about usage of res.redirect
schedule(resRedirect(true));
