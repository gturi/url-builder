import { execSync } from 'child_process';

try {
  const oneDay = 24 * 60 * 60;
  const lastCommitTimestamp = parseInt(execSync('git log -1 --format=%cd --date=unix').toString(), 10);
  const currentTimestamp = Math.floor(new Date().getTime() / 1000);

  if ((lastCommitTimestamp + oneDay) > currentTimestamp) {
    // a commit was made in the last 24 hours, create a new release
    console.log('run');
  } else {
    // no commit was made in the last 24 hours, skip new release creation
    console.log('skip');
  }
} catch (e) {
  console.error(e);
  process.exit(-1);
}
