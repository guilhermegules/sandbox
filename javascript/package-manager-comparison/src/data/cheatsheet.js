/**
 * Command-by-command cheat sheet across npm, Yarn Classic, Yarn Modern, and pnpm.
 */

export const CHEATSHEET = [
  {
    action: 'Install all dependencies',
    npm: 'npm install (or npm i)',
    yarnClassic: 'yarn install (or yarn)',
    yarnModern: 'yarn install (or yarn)',
    pnpm: 'pnpm install (or pnpm i)'
  },
  {
    action: 'Clean / Strict CI install',
    npm: 'npm ci',
    yarnClassic: 'yarn install --frozen-lockfile',
    yarnModern: 'yarn install --immutable',
    pnpm: 'pnpm install --frozen-lockfile'
  },
  {
    action: 'Add dependency',
    npm: 'npm install <pkg>',
    yarnClassic: 'yarn add <pkg>',
    yarnModern: 'yarn add <pkg>',
    pnpm: 'pnpm add <pkg>'
  },
  {
    action: 'Add dev dependency',
    npm: 'npm install -D <pkg>',
    yarnClassic: 'yarn add -D <pkg>',
    yarnModern: 'yarn add -D <pkg>',
    pnpm: 'pnpm add -D <pkg>'
  },
  {
    action: 'Add peer dependency',
    npm: 'npm install --save-peer <pkg>',
    yarnClassic: 'yarn add --peer <pkg>',
    yarnModern: 'yarn add --peer <pkg>',
    pnpm: 'pnpm add --save-peer <pkg>'
  },
  {
    action: 'Add exact version (no caret ^)',
    npm: 'npm install -E <pkg>',
    yarnClassic: 'yarn add -E <pkg>',
    yarnModern: 'yarn add --exact <pkg>',
    pnpm: 'pnpm add -E <pkg>'
  },
  {
    action: 'Remove dependency',
    npm: 'npm uninstall <pkg>',
    yarnClassic: 'yarn remove <pkg>',
    yarnModern: 'yarn remove <pkg>',
    pnpm: 'pnpm remove <pkg>'
  },
  {
    action: 'Update all dependencies',
    npm: 'npm update',
    yarnClassic: 'yarn upgrade',
    yarnModern: 'yarn up',
    pnpm: 'pnpm update (or pnpm up)'
  },
  {
    action: 'Interactive upgrade',
    npm: 'npx npm-check-updates -i',
    yarnClassic: 'yarn upgrade-interactive',
    yarnModern: 'yarn up -i',
    pnpm: 'pnpm update -i --latest'
  },
  {
    action: 'Run a package.json script',
    npm: 'npm run <script>',
    yarnClassic: 'yarn <script>',
    yarnModern: 'yarn <script>',
    pnpm: 'pnpm <script>'
  },
  {
    action: 'Execute remote / temporary binary',
    npm: 'npx <pkg>',
    yarnClassic: 'npx <pkg>',
    yarnModern: 'yarn dlx <pkg>',
    pnpm: 'pnpm dlx <pkg>'
  },
  {
    action: 'Check outdated packages',
    npm: 'npm outdated',
    yarnClassic: 'yarn outdated',
    yarnModern: 'yarn outdated (via plugin)',
    pnpm: 'pnpm outdated'
  },
  {
    action: 'Security audit',
    npm: 'npm audit',
    yarnClassic: 'yarn audit',
    yarnModern: 'yarn npm audit',
    pnpm: 'pnpm audit'
  },
  {
    action: 'Auto-fix security audit',
    npm: 'npm audit fix',
    yarnClassic: 'Not built-in',
    yarnModern: 'yarn npm audit --severity ...',
    pnpm: 'pnpm audit --fix'
  },
  {
    action: 'Deduplicate dependencies in lockfile',
    npm: 'npm dedupe',
    yarnClassic: 'npx yarn-deduplicate',
    yarnModern: 'yarn dedupe',
    pnpm: 'pnpm dedupe'
  },
  {
    action: 'Run script in specific workspace',
    npm: 'npm run <cmd> -w <pkg>',
    yarnClassic: 'yarn workspace <pkg> <cmd>',
    yarnModern: 'yarn workspace <pkg> <cmd>',
    pnpm: 'pnpm --filter <pkg> <cmd>'
  },
  {
    action: 'Run script across ALL workspaces',
    npm: 'npm run <cmd> --workspaces',
    yarnClassic: 'yarn workspaces run <cmd>',
    yarnModern: 'yarn workspaces foreach run <cmd>',
    pnpm: 'pnpm -r run <cmd>'
  },
  {
    action: 'Clear package cache',
    npm: 'npm cache clean --force',
    yarnClassic: 'yarn cache clean',
    yarnModern: 'yarn cache clean',
    pnpm: 'pnpm store prune'
  }
];
