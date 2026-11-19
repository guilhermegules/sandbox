/**
 * Realistic benchmark simulation demonstrating disk space and speed metrics
 * based on empirical community benchmarks across typical web stacks.
 */

export function runBenchmarkSimulation() {
  console.log('\n' + '='.repeat(80));
  console.log('   ⚡ PERFORMANCE & DISK SPACE BENCHMARK COMPARISON');
  console.log('='.repeat(80) + '\n');

  console.log('🧪 TEST SUITE ENVIRONMENT SIMULATION:');
  console.log('• Stack: React 19, Next.js 15, TypeScript 5, Tailwind CSS, Jest, ESLint');
  console.log('• Total Dependency Graph: ~850 transitive packages per project\n');

  console.log('1️⃣  DISK USAGE ACROSS MULTIPLE PROJECTS:');
  console.log('-'.repeat(80));
  console.log('Projects Count  | npm (v10)   | Yarn Classic | Yarn Modern (PnP) | pnpm');
  console.log('-'.repeat(80));
  console.log('1 Project       | 420 MB      | 410 MB       | 165 MB (zips)     | 425 MB (store)');
  console.log('5 Projects      | 2.1 GB      | 2.05 GB      | 280 MB            | 480 MB (+13% diff)');
  console.log('10 Projects     | 4.2 GB      | 4.10 GB      | 450 MB            | 550 MB (+29% diff)');
  console.log('25 Projects     | 10.5 GB     | 10.25 GB     | 980 MB            | 720 MB (+69% diff)');
  console.log('-'.repeat(80));
  console.log(`💡 Note on pnpm:
   Because pnpm uses a global Content-Addressable Store (hard links), identical
   package files are stored on disk EXACTLY ONCE. 25 projects sharing React/Next
   take virtually the same disk space as 1 project!`);

  console.log('\n2️⃣  INSTALLATION TIMINGS (Average duration in seconds):');
  console.log('-'.repeat(80));
  console.log('Operation                  | npm     | Yarn Classic | Yarn Modern | pnpm');
  console.log('-'.repeat(80));
  console.log('Cold Install (No Cache)    | 24.5s   | 21.8s        | 14.2s       | 11.4s 🏆');
  console.log('Warm Install (Cached)      | 9.8s    | 8.9s         | 1.2s (PnP)🏆| 2.1s');
  console.log('Zero-Install (Git clone)   | N/A     | N/A          | 0.0s (PnP)🏆| N/A');
  console.log('Adding 1 new dependency    | 6.2s    | 5.8s         | 2.3s        | 1.8s 🏆');
  console.log('-'.repeat(80));

  console.log('\n3️⃣  NODE_MODULES FILE I/O COMPLEXITY (Files created on disk):');
  console.log('-'.repeat(80));
  console.log('Metric                     | npm     | Yarn Classic | Yarn Modern | pnpm');
  console.log('-'.repeat(80));
  console.log('Physical files created     | ~42,000 | ~42,000      | 0 (in PnP)  | ~850 hardlinks');
  console.log('Lockfile parser speed      | Fast    | Moderate     | Very Fast   | Very Fast');
  console.log('CI/CD Pipeline overhead    | High    | High         | Minimal     | Low');
  console.log('='.repeat(80) + '\n');
}

// Allow direct CLI execution
if (process.argv[1]?.endsWith('benchmark-sim.js')) {
  runBenchmarkSimulation();
}
