/**
 * Package Manager Comparison CLI
 * Compares npm, Yarn Classic, Yarn Modern (Berry), and pnpm.
 */

import { PACKAGE_MANAGERS, COMPARISON_MATRIX } from './data/comparisons.js';
import { CHEATSHEET } from './data/cheatsheet.js';
import { runPhantomDemo } from './phantom-demo.js';
import { printAdvisoryReport } from './advisor.js';
import { runBenchmarkSimulation } from './benchmark-sim.js';

function printHeader() {
  console.log('\n' + '='.repeat(85));
  console.log('   📦 JAVASCRIPT PACKAGE MANAGERS DEEP COMPARISON');
  console.log('   Comparing: npm vs. Yarn Classic (v1) vs. Yarn Modern (Berry) vs. pnpm');
  console.log('='.repeat(85) + '\n');
}

function printOverview() {
  printHeader();
  console.log('📋 SUMMARY OF PACKAGE MANAGERS:\n');

  for (const [key, pm] of Object.entries(PACKAGE_MANAGERS)) {
    console.log(`🔷 ${pm.displayName.toUpperCase()}`);
    console.log(`   • Creator: ${pm.creator} (${pm.releaseYear})`);
    console.log(`   • Current Status: ${pm.currentStatus}`);
    console.log(`   • Resolution Strategy: ${pm.resolutionStrategy}`);
    console.log(`   • Lockfile: ${pm.lockfile}`);
    console.log(`   • Phantom Deps Protection: ${pm.phantomDependencies}`);
    console.log(`   • Disk Efficiency: ${pm.diskEfficiency}`);
    console.log('   • Key Pros:');
    pm.pros.forEach(p => console.log(`     ➕ ${p}`));
    console.log('   • Key Cons:');
    pm.cons.forEach(c => console.log(`     ➖ ${c}`));
    console.log('-'.repeat(85));
  }
}

function printMatrix() {
  printHeader();
  console.log('📊 DETAILED COMPARISON MATRIX:\n');

  for (const section of COMPARISON_MATRIX) {
    console.log(`\n📌 [ ${section.category.toUpperCase()} ]`);
    console.log('-'.repeat(85));

    for (const metric of section.metrics) {
      console.log(`\n🔹 Metric: ${metric.attribute}`);
      console.log(`   • npm:          ${metric.npm}`);
      console.log(`   • Yarn Classic: ${metric.yarnClassic}`);
      console.log(`   • Yarn Modern:  ${metric.yarnModern}`);
      console.log(`   • pnpm:         ${metric.pnpm}`);
    }
  }
  console.log('\n' + '='.repeat(85));
}

function printCheatsheet() {
  printHeader();
  console.log('🛠️  CLI COMMAND TRANSLATION CHEAT SHEET:\n');
  console.log(
    'Task'.padEnd(30) +
    '| npm'.padEnd(25) +
    '| Yarn Classic'.padEnd(25) +
    '| Yarn Modern'.padEnd(25) +
    '| pnpm'
  );
  console.log('-'.repeat(125));

  for (const row of CHEATSHEET) {
    console.log(
      row.action.padEnd(30) +
      `| ${row.npm}`.padEnd(25) +
      `| ${row.yarnClassic}`.padEnd(25) +
      `| ${row.yarnModern}`.padEnd(25) +
      `| ${row.pnpm}`
    );
  }
  console.log('='.repeat(125) + '\n');
}

function printArchitecture() {
  printHeader();
  console.log(`🏗️  HOW EACH RESOLUTION ARCHITECTURE WORKS UNDER THE HOOD:

1️⃣  FLAT HOISTED TREE (npm v3-v10 & Yarn Classic v1)
-------------------------------------------------------------------------------------
  How it works:
  - npm and Yarn Classic download all dependencies into physical directories.
  - To minimize duplication, transitive dependencies are hoisted up into the top-level
    ./node_modules folder.
  - Drawback 1: Phantom Dependencies. Because packages are at the root, your code can
    require('package-foo') without ever listing it in package.json!
  - Drawback 2: Doppelgangers. If Package A needs Foo@1 and Package B needs Foo@2,
    one gets hoisted and the other remains nested, producing duplicate copies.
  - Drawback 3: Massive disk waste across projects (gigabytes of duplicate files).

2️⃣  PLUG'N'PLAY / PnP (Yarn Modern / Berry v2-v4+)
-------------------------------------------------------------------------------------
  How it works:
  - Completely gets rid of the physical 'node_modules' folder.
  - Generates a single lookup map file: '.pnp.cjs'.
  - Packages are kept as compressed zip files in '.yarn/cache'.
  - Monkey-patches Node's 'fs' and 'module' loader to resolve directly into zip files.
  - Benefit 1: Zero-installs. You can check the lightweight zip files directly into Git.
  - Benefit 2: Zero file I/O during installation. CI setups drop from 30s to 0s!
  - Benefit 3: Strict security boundaries. Only declared dependencies can be imported.
  - Drawback: Some legacy native tools or packages that make hard-coded file path
    assumptions require fallback (via 'nodeLinker: node-modules').

3️⃣  CONTENT-ADDRESSABLE STORE + SYMLINKS (pnpm v9-v11+)
-------------------------------------------------------------------------------------
  How it works:
  - Files are stored once on your system inside a global Content-Addressable Store:
    ~/.local/share/pnpm/store
  - When you install dependencies in a project, pnpm creates hard links from the store
    into your project's node_modules/.pnpm.
  - Only direct dependencies declared in your package.json are placed (as symlinks)
    into the root node_modules directory!
  - Benefit 1: Immense disk space savings (often 70% reduction across a machine).
  - Benefit 2: Blazing fast installs (creating hard links takes milliseconds).
  - Benefit 3: Completely eliminates phantom dependencies while retaining 100%
    standard Node.js filesystem compatibility!
  - Benefit 4: First-class monorepo workspace filter commands ('pnpm --filter').
`);
}

function printUsage() {
  console.log(`
Usage: node src/index.js [command]

Available Commands:
  (no arg)      Display full overview of all 4 package managers
  compare       Display structured comparison matrix
  cheatsheet    Display CLI command mapping cheatsheet
  architecture  Explain underlying resolution mechanics (Hoisting vs PnP vs Hardlinks)
  phantom       Run phantom / ghost dependency demonstration
  advisor       Run project recommendation decision matrix
  benchmark     Run benchmark simulation (disk usage & install speed)
`);
}

// Parse command line arguments
const command = process.argv[2]?.toLowerCase();

switch (command) {
  case 'compare':
    printMatrix();
    break;
  case 'cheatsheet':
    printCheatsheet();
    break;
  case 'architecture':
    printArchitecture();
    break;
  case 'phantom':
    runPhantomDemo();
    break;
  case 'advisor':
    printAdvisoryReport();
    break;
  case 'benchmark':
    runBenchmarkSimulation();
    break;
  case 'help':
  case '--help':
  case '-h':
    printUsage();
    break;
  default:
    printOverview();
    printMatrix();
    printUsage();
    break;
}
