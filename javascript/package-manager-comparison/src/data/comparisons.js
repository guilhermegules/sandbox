/**
 * Detailed comparison data for npm, Yarn Classic (v1), Yarn Modern (Berry), and pnpm.
 */

export const PACKAGE_MANAGERS = {
  npm: {
    name: 'npm',
    displayName: 'npm (v10+)',
    creator: 'Isaac Z. Schlueter / npm, Inc. (acquired by GitHub / Microsoft)',
    releaseYear: 2010,
    currentStatus: 'Active & Default in Node.js',
    resolutionStrategy: 'Flat node_modules with Hoisting',
    lockfile: 'package-lock.json (version 3 format)',
    storageModel: 'Per-project full duplicate copies (global tarball cache in ~/.npm)',
    phantomDependencies: 'Vulnerable (hoisted dependencies are directly accessible)',
    doppelgangers: 'Possible (duplicate versions created if version ranges conflict in deep tree)',
    diskEfficiency: 'Low (duplicates packages across every local project on disk)',
    installSpeed: 'Moderate (greatly improved in v7-v10, but still copies thousands of files)',
    monorepoSupport: 'Native npm Workspaces (introduced in v7)',
    zeroInstalls: 'Not supported without committing entire node_modules',
    corepackSupport: 'Supported via Corepack',
    keyFeatures: [
      'Pre-installed with Node.js runtime (no setup needed)',
      'Built-in security auditing (`npm audit`) and overrides (`overrides` field)',
      'npm workspaces for monorepo dependency orchestration',
      'npx tool for running arbitrary binary packages without local install',
      'Package provenance and signing support for supply-chain integrity'
    ],
    pros: [
      'Zero installation friction: ships out of the box with Node.js',
      'Universal compatibility with every tooling and legacy build system',
      'Massive global community and primary registry interface',
      'No complex virtual filesystem abstraction required'
    ],
    cons: [
      'Huge disk usage due to local duplication in each project',
      'Vulnerable to phantom dependencies due to hoisted flat directory layout',
      'Slower I/O operations compared to content-addressable and symlink architectures',
      'Non-deterministic installs historically before strict lockfile enforcement'
    ]
  },

  yarnClassic: {
    name: 'yarnClassic',
    displayName: 'Yarn Classic (v1.22.x)',
    creator: 'Facebook (Meta), Exponent, Google, Tilde',
    releaseYear: 2016,
    currentStatus: 'Maintenance Mode / Deprecated (Frozen since 2020)',
    resolutionStrategy: 'Flat node_modules with Hoisting',
    lockfile: 'yarn.lock (v1 custom format)',
    storageModel: 'Per-project full copies with global cache (~/.cache/yarn)',
    phantomDependencies: 'Vulnerable (hoisted packages can be imported without declaration)',
    doppelgangers: 'Possible (flat tree conflicts push nested dependencies down)',
    diskEfficiency: 'Low (duplicates files across every project directory)',
    installSpeed: 'Fast in 2016, now surpassed by pnpm and Yarn Modern',
    monorepoSupport: 'First-class workspaces (popularized monorepo development)',
    zeroInstalls: 'Not supported (requires huge node_modules committing)',
    corepackSupport: 'Supported via `corepack prepare yarn@1.22.22`',
    keyFeatures: [
      'Introduced deterministic lockfiles (`yarn.lock`) to the JS ecosystem',
      'Pioneered parallel package downloads and offline caching',
      'Pioneered native Monorepo Workspaces in 2017',
      'Interactive dependency upgrade (`yarn upgrade-interactive`)',
      'Cleaner, more user-friendly terminal UI output'
    ],
    pros: [
      'Battle-tested stability over almost a decade',
      'Native workspaces well supported by CI and older tooling',
      'Familiar command syntax for millions of developers',
      'Fast offline installation from local cache'
    ],
    cons: [
      'Legacy / Maintenance mode: receives only critical security fixes',
      'Suffers from flat node_modules hoisting issues and phantom dependencies',
      'Does not benefit from modern storage optimizations (content-addressable/PnP)',
      'High disk space footprint across multiple local repositories'
    ]
  },

  yarnModern: {
    name: 'yarnModern',
    displayName: 'Yarn Modern (Berry v2 - v4+)',
    creator: 'Maël Nison & Yarn Community',
    releaseYear: 2020,
    currentStatus: 'Active & Actively Developed (v4+)',
    resolutionStrategy: "Plug'n'Play (PnP) by default (or nodeLinker: node-modules / pnpm)",
    lockfile: 'yarn.lock (v2+ YAML format)',
    storageModel: 'Central zip archives (.yarn/cache) or node_modules via nodeLinker',
    phantomDependencies: 'Completely eliminated in PnP mode (strict import boundary enforcement)',
    doppelgangers: 'Completely eliminated in PnP mode',
    diskEfficiency: 'High (zip caches + zero installs or hard links)',
    installSpeed: 'Extremely fast (near instantaneous in zero-install / cached setups)',
    monorepoSupport: 'Advanced Workspaces with release management, topological execution, constraints',
    zeroInstalls: 'Fully supported (commit .yarn/cache zip files into Git for 0s CI setup)',
    corepackSupport: 'Primary distribution method via Corepack',
    keyFeatures: [
      "Plug'n'Play (PnP): maps dependency trees into a single JS resolver (.pnp.cjs) with NO node_modules",
      'Zero-installs: enables checking dependencies into git as lightweight zips',
      'Yarn Constraints: enforces repo-wide policies (e.g. enforce same dependency versions across all packages)',
      'Extensible TypeScript-based plugin architecture (@yarnpkg/plugin-*)',
      'Flexible linkers: switch easily between pnp, node-modules, or pnpm linkers via .yarnrc.yml'
    ],
    pros: [
      'Zero-install workflow completely eliminates `npm install` step in CI/CD',
      'Strict dependency validation stops phantom dependencies at development time',
      'Instant project startup and zero file-copy overhead in PnP mode',
      'Powerful workspace tooling and cross-package version constraints'
    ],
    cons: [
      'PnP compatibility issues with packages that assume physical node_modules paths or bypass Node require',
      'Requires IDE SDK integration (@yarnpkg/sdks) for VS Code / WebStorm TypeScript support',
      'Steeper learning curve and departure from traditional node_modules mental model',
      'Corepack deprecation debates in Node.js require understanding alternate install methods'
    ]
  },

  pnpm: {
    name: 'pnpm',
    displayName: 'pnpm (v9 - v11+)',
    creator: 'Zoltan Kochan & pnpm community',
    releaseYear: 2016,
    currentStatus: 'Active & Rapidly Growing',
    resolutionStrategy: 'Symlinked & Hardlinked non-flat structure from Content-Addressable Store',
    lockfile: 'pnpm-lock.yaml',
    storageModel: 'Global Content-Addressable Store (hard links to ~/.local/share/pnpm/store)',
    phantomDependencies: 'Completely eliminated (only declared dependencies are placed at node_modules root)',
    doppelgangers: 'Eliminated through content-addressable deduplication',
    diskEfficiency: 'Exceptional (saves gigabytes of disk space; files are stored once globally)',
    installSpeed: 'Blazing fast (hard links are near instantaneous; parallel resolution)',
    monorepoSupport: 'Industry-standard pnpm Workspaces (adopted by Vue, Vite, Next.js, TanStack, Prisma)',
    zeroInstalls: 'Not designed for zero-installs, but installs from local store are instantaneous',
    corepackSupport: 'Supported via Corepack or standalone standalone script / npm i -g pnpm',
    keyFeatures: [
      'Global Content-Addressable Storage: identical package files are hard-linked across all projects',
      'Isolated, non-flat node_modules: dependencies cannot secretly require undeclared transitive dependencies',
      'Strict peer dependencies validation and explicit peer resolution controls',
      '.pnpmfile.cjs hooks for intercepting and patching package definitions',
      'High-performance monorepo filter engine (`--filter <package-name>...`)'
    ],
    pros: [
      'Saves immense disk space (often 60%-80% disk reduction across repositories)',
      'Industry-leading installation and update speeds on cold and warm cache',
      'Preserves physical `node_modules` compatibility while retaining strict security',
      'Adopted by major OSS ecosystems (Vue, Vite, Nuxt, Svelte, Prisma, TanStack)',
      'Prevents phantom dependencies without breaking standard file paths'
    ],
    cons: [
      'Symlink support can require tweaks in certain edge environments (Docker, Windows non-developer mode)',
      'Strict peer dependency handling can sometimes require `auto-install-peers` or `.npmrc` configuration',
      'A few legacy tools that traverse directories naively can get confused by symlinks'
    ]
  }
};

export const COMPARISON_MATRIX = [
  {
    category: 'Architecture & Resolution',
    metrics: [
      {
        attribute: 'node_modules Layout',
        npm: 'Flat / Hoisted',
        yarnClassic: 'Flat / Hoisted',
        yarnModern: 'Virtual / PnP (or flat via nodeLinker)',
        pnpm: 'Nested + Symlinked / Hardlinked'
      },
      {
        attribute: 'Storage Mechanism',
        npm: 'Full duplicates per project',
        yarnClassic: 'Full duplicates per project',
        yarnModern: 'Compressed zip files / Virtual index',
        pnpm: 'Global Content-Addressable Store (Hard links)'
      },
      {
        attribute: 'Phantom Dependency Protection',
        npm: '❌ None (Vulnerable to ghost imports)',
        yarnClassic: '❌ None (Vulnerable to ghost imports)',
        yarnModern: '✅ Strict (Enforced by PnP resolver)',
        pnpm: '✅ Strict (Only declared pkgs in root node_modules)'
      },
      {
        attribute: 'Doppelganger Protection',
        npm: '❌ Poor (Hoisting collisions cause duplicates)',
        yarnClassic: '❌ Poor (Hoisting collisions cause duplicates)',
        yarnModern: '✅ Full (PnP maps exact paths)',
        pnpm: '✅ Full (Deduped at the file-level in store)'
      }
    ]
  },
  {
    category: 'Performance & Storage',
    metrics: [
      {
        attribute: 'Cold Install Speed (No cache)',
        npm: 'Moderate (~25s)',
        yarnClassic: 'Moderate (~22s)',
        yarnModern: 'Fast (~15s)',
        pnpm: 'Very Fast (~12s)'
      },
      {
        attribute: 'Warm Install Speed (Cached)',
        npm: 'Fast (~10s)',
        yarnClassic: 'Fast (~9s)',
        yarnModern: 'Instantaneous (~1s PnP)',
        pnpm: 'Extremely Fast (~2s)'
      },
      {
        attribute: 'Disk Usage across 10 Projects',
        npm: 'Very High (~5.2 GB)',
        yarnClassic: 'Very High (~5.0 GB)',
        yarnModern: 'Low (~1.2 GB in zip cache)',
        pnpm: 'Minimal (~550 MB shared store)'
      },
      {
        attribute: 'Zero-Installs Support',
        npm: '❌ Impractical',
        yarnClassic: '❌ Impractical',
        yarnModern: '✅ Native (.yarn/cache + PnP)',
        pnpm: '❌ Not recommended'
      }
    ]
  },
  {
    category: 'Monorepo & Workspaces',
    metrics: [
      {
        attribute: 'Workspace Protocol (workspace:*)',
        npm: '✅ Supported (v7+)',
        yarnClassic: '⚠️ Basic (limited syntax)',
        yarnModern: '✅ Advanced (protocol + constraints)',
        pnpm: '✅ Advanced (protocol + catalog + filters)'
      },
      {
        attribute: 'Filter Commands',
        npm: 'Basic (`--workspace`)',
        yarnClassic: 'Basic (`workspaces run`)',
        yarnModern: 'Rich (`yarn workspaces foreach`)',
        pnpm: 'Exceptional (`pnpm --filter ...`)'
      },
      {
        attribute: 'Dependency Deduplication in Repo',
        npm: 'Hoisted to monorepo root',
        yarnClassic: 'Hoisted to monorepo root',
        yarnModern: 'Exact virtual mapping',
        pnpm: 'Hard-linked to central store'
      }
    ]
  },
  {
    category: 'Tooling & Ecosystem',
    metrics: [
      {
        attribute: 'Default in Node.js',
        npm: '✅ Yes',
        yarnClassic: '❌ No',
        yarnModern: '❌ No (Via Corepack / standalone)',
        pnpm: '❌ No (Via Corepack / standalone / npm)'
      },
      {
        attribute: 'Lockfile Format',
        npm: 'JSON (`package-lock.json`)',
        yarnClassic: 'Custom text (`yarn.lock`)',
        yarnModern: 'YAML (`yarn.lock`)',
        pnpm: 'YAML (`pnpm-lock.yaml`)'
      },
      {
        attribute: 'Configuration File',
        npm: '.npmrc',
        yarnClassic: '.yarnrc',
        yarnModern: '.yarnrc.yml',
        pnpm: '.npmrc + pnpm-workspace.yaml'
      },
      {
        attribute: '2026 Recommended Use',
        npm: 'Small projects, zero-setup environments, CI standard',
        yarnClassic: 'Legacy maintenance only (migrate away)',
        yarnModern: 'Zero-install teams, strict constraints, PnP lovers',
        pnpm: 'Modern monorepos, high performance, large enterprise codebases'
      }
    ]
  }
];
