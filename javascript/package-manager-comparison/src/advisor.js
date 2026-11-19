/**
 * Project Package Manager Advisor.
 * Analyzes specific requirements and provides actionable recommendations.
 */

export function getRecommendation(criteria = {}) {
  const {
    isMonorepo = false,
    diskSpaceSensitive = false,
    wantsZeroInstall = false,
    strictSecurity = false,
    needsZeroConfig = false,
    hasLegacyTooling = false,
    reactNative = false
  } = criteria;

  const scores = {
    npm: 0,
    yarnClassic: 0,
    yarnModern: 0,
    pnpm: 0
  };

  const rationale = [];

  if (needsZeroConfig) {
    scores.npm += 5;
    rationale.push('• npm comes pre-installed with Node.js, requiring zero additional runtime tools.');
  }

  if (wantsZeroInstall) {
    scores.yarnModern += 8;
    rationale.push('• Yarn Modern (Berry) natively supports Zero-Installs via .yarn/cache zip files.');
  }

  if (diskSpaceSensitive) {
    scores.pnpm += 6;
    scores.yarnModern += 3;
    rationale.push('• pnpm utilizes global hard linking from a content-addressable store to save massive disk space.');
  }

  if (isMonorepo) {
    scores.pnpm += 5;
    scores.yarnModern += 4;
    scores.npm += 1;
    rationale.push('• pnpm and Yarn Modern feature world-class workspace filtering and topological pipeline management.');
  }

  if (strictSecurity) {
    scores.pnpm += 4;
    scores.yarnModern += 4;
    scores.npm -= 2;
    scores.yarnClassic -= 3;
    rationale.push('• pnpm and Yarn Modern strictly eliminate phantom and ghost dependencies.');
  }

  if (hasLegacyTooling || reactNative) {
    scores.npm += 3;
    scores.yarnClassic += 2;
    scores.pnpm += 2; // pnpm with shamefully-hoist or node-linker
    scores.yarnModern -= 2; // PnP often requires nodeLinker: node-modules for RN
    rationale.push('• React Native and legacy tools frequently expect a physical flat node_modules directory.');
  }

  // Yarn Classic penalty (deprecated)
  scores.yarnClassic -= 5;
  rationale.push('• Yarn Classic is deprecated and frozen; new projects should avoid it.');

  // Rank results
  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const best = ranked[0][0];

  const mapNames = {
    npm: 'npm (v10+)',
    yarnClassic: 'Yarn Classic (v1)',
    yarnModern: 'Yarn Modern (Berry v4+)',
    pnpm: 'pnpm (v9-v11+)'
  };

  return {
    winner: mapNames[best],
    runnerUp: mapNames[ranked[1][0]],
    scores,
    rationale
  };
}

export function printAdvisoryReport() {
  console.log('\n' + '='.repeat(80));
  console.log('   🎯 PACKAGE MANAGER DECISION MATRIX & SCENARIO GUIDE');
  console.log('='.repeat(80) + '\n');

  const scenarios = [
    {
      title: 'Scenario 1: Large Enterprise Monorepo (Next.js, UI Library, Microservices)',
      criteria: { isMonorepo: true, diskSpaceSensitive: true, strictSecurity: true },
      recommended: 'pnpm'
    },
    {
      title: 'Scenario 2: Minimalist API or Lightweight App (Zero extra tool setup)',
      criteria: { needsZeroConfig: true },
      recommended: 'npm'
    },
    {
      title: 'Scenario 3: Ultra-Fast CI/CD Pipelines (Zero-Installs desired)',
      criteria: { wantsZeroInstall: true, strictSecurity: true },
      recommended: 'Yarn Modern (Berry)'
    },
    {
      title: 'Scenario 4: Legacy React Native / Mobile Project with non-standard file loaders',
      criteria: { hasLegacyTooling: true, reactNative: true },
      recommended: 'npm or pnpm (with shamefully-hoist)'
    }
  ];

  for (const s of scenarios) {
    const res = getRecommendation(s.criteria);
    console.log(`📌 ${s.title}`);
    console.log(`   🏆 Recommended: ${res.winner}`);
    console.log(`   🥈 Alternative: ${res.runnerUp}`);
    console.log('   Key reasons:');
    res.rationale.forEach(r => console.log(`     ${r}`));
    console.log('-'.repeat(80));
  }
}

// Allow direct CLI execution
if (process.argv[1]?.endsWith('advisor.js')) {
  printAdvisoryReport();
}
