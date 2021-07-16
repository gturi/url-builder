import { execSync } from 'child_process';

// Default value `unknown` if no args provided via CLI.
const arg = process.argv[2] || 'unknown';

const deployDir = `gh-pages/${arg}`;
const options = { stdio: [0, 1, 2] };

// generate typedoc
execSync(`npx typedoc --out ${deployDir}/docs/ src/`, options);
