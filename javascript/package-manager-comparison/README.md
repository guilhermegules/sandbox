# JavaScript Package Manager Comparison 📦

An in-depth, practical comparison and analysis between **npm**, **Yarn Classic (v1)**, **Yarn Modern (Berry v4+)**, and **pnpm**.

This repository contains architectural explanations, benchmarks, configuration examples, and interactive CLI exploration tools to help developers and teams choose the right package manager for their workflow.

---

## Table of Contents

1. [Quick Comparison Matrix](#quick-comparison-matrix)
2. [Dedicated Project Folders](#dedicated-project-folders)
3. [Package Manager Overviews](#package-manager-overviews)
   - [npm (Node Package Manager)](#1-npm-v10)
   - [Yarn Classic (v1.22.x)](#2-yarn-classic-v122x)
   - [Yarn Modern (Berry v2 - v4+)](#3-yarn-modern--berry-v2---v4)
   - [pnpm (Performant npm)](#4-pnpm-v9---v11)
4. [Under the Hood: Resolution & Storage Architectures](#under-the-hood-resolution--storage-architectures)
   - [Flat Hoisted Tree (npm & Yarn Classic)](#a-flat-hoisted-tree-npm--yarn-classic)
   - [Content-Addressable Store & Symlinks (pnpm)](#b-content-addressable-store--symlinks-pnpm)
   - [Plug'n'Play / PnP (Yarn Modern)](#c-plugnplay-pnp-yarn-modern)
5. [The Phantom Dependency & Doppelganger Problem](#the-phantom-dependency--doppelganger-problem)
6. [Lockfile Comparison](#lockfile-comparison)
7. [Performance & Disk Space Benchmarks](#performance--disk-space-benchmarks)
8. [Monorepos & Workspaces](#monorepos--workspaces)
9. [CLI Command Translation Cheat Sheet](#cli-command-translation-cheat-sheet)
10. [Decision Guide: Which Should You Use?](#decision-guide-which-should-you-use)
11. [Running the Interactive Tools](#running-the-interactive-tools)

---

## Dedicated Project Folders

Each package manager has its own dedicated folder containing concrete project configurations, lockfiles, and documentation:

- 📦 [**npm/**](file:///home/guilherme/workspace/sandbox/javascript/package-manager-comparison/npm/README.md) — Configured with `.npmrc`, `package.json` (`overrides`), `package-lock.json` v3, and runner script.
- 🧶 [**yarn-classic/**](file:///home/guilherme/workspace/sandbox/javascript/package-manager-comparison/yarn-classic/README.md) — Configured with `.yarnrc`, `package.json` (`resolutions`), `yarn.lock` v1, and runner script.
- 🍇 [**yarn-berry/**](file:///home/guilherme/workspace/sandbox/javascript/package-manager-comparison/yarn-berry/README.md) — Configured with `.yarnrc.yml` (PnP + Zero-Installs), `package.json` (`packageManager`), `yarn.lock` v8 YAML format.
- ⚡ [**pnpm/**](file:///home/guilherme/workspace/sandbox/javascript/package-manager-comparison/pnpm/README.md) — Configured with `pnpm-workspace.yaml`, `.npmrc`, `package.json` (`pnpm.overrides`), `pnpm-lock.yaml` v9.


---

## Quick Comparison Matrix

| Feature / Dimension | npm (v10+) | Yarn Classic (v1.22) | Yarn Modern (Berry v4+) | pnpm (v9 - v11+) |
| :--- | :--- | :--- | :--- | :--- |
| **Status** | Active (Default in Node.js) | Deprecated / Frozen | Active & Growing | Active & High Adoption |
| **Resolution Method** | Flat Hoisted `node_modules` | Flat Hoisted `node_modules` | Plug'n'Play (PnP) or nodeLinker | Non-flat Symlinked & Hardlinked |
| **Storage Strategy** | Duplicate copy per project | Duplicate copy per project | Compressed `.yarn/cache` zips | Global Content-Addressable Store |
| **Disk Usage** | 🔴 Very High (copies files) | 🔴 Very High (copies files) | 🟢 Low (compressed zips) | 🟢 Minimal (deduplicated globally) |
| **Install Speed (Cold)** | 🟡 Moderate (~25s) | 🟡 Moderate (~22s) | 🟢 Fast (~14s) | 🚀 Fastest (~11s) |
| **Install Speed (Cached)** | 🟡 Fast (~9-10s) | 🟡 Fast (~8-9s) | 🚀 Instantaneous (~1s PnP) | 🚀 Extremely Fast (~2s) |
| **Phantom Dependencies** | ❌ Vulnerable | ❌ Vulnerable | 🛡️ Immune (Enforced by PnP) | 🛡️ Immune (Isolated node_modules) |
| **Doppelgangers** | ❌ Prone | ❌ Prone | 🛡️ Immune | 🛡️ Immune (File-level store) |
| **Zero-Installs** | ❌ No | ❌ No | ✅ Native & Built-in | ❌ No |
| **Monorepo Workspaces** | Native (Basic) | Native (Pioneered) | Advanced + Constraints | Advanced + Filter Engine |
| **Lockfile Format** | `package-lock.json` (JSON) | `yarn.lock` (v1 custom) | `yarn.lock` (v2+ YAML) | `pnpm-lock.yaml` (YAML) |
| **Config File** | `.npmrc` | `.yarnrc` | `.yarnrc.yml` | `.npmrc`, `pnpm-workspace.yaml` |

---

## Package Manager Overviews

### 1. npm (v10+)
- **Creator**: Isaac Z. Schlueter (2010), now maintained by GitHub / Microsoft.
- **Role**: The standard, canonical package manager bundled by default with every Node.js installation.
- **Key Concepts**:
  - Requires **zero installation or configuration** on developer machines and CI runners.
  - Generates `package-lock.json` (version 3 format in modern npm).
  - Offers native `npm audit` for vulnerability auditing, `npm run` scripts, and `npx` for executing one-off binaries.
- **Strengths**: Universally compatible with every script, library, and legacy deployment system. No onboarding friction.
- **Weaknesses**: Hoisted flat `node_modules` can cause phantom dependencies; stores redundant copies of packages across projects, taking up massive disk space.

### 2. Yarn Classic (v1.22.x)
- **Creator**: Facebook (Meta), Exponent, Google, and Tilde (2016).
- **Role**: Created to solve early npm (npm v3) performance bottlenecks, non-deterministic builds, and lack of offline caching.
- **Key Concepts**:
  - Introduced deterministic lockfiles (`yarn.lock`), parallel package fetching, and monorepo workspaces.
  - **Status**: Formally frozen and in **maintenance mode** since 2020. No new features; only critical security fixes.
- **Strengths**: Familiar syntax, historically stable, supported by older CI pipelines.
- **Weaknesses**: Legacy codebase; lacks modern storage optimizations (content-addressable store or PnP); shares npm's flat hoisting flaws.

### 3. Yarn Modern / Berry (v2 - v4+)
- **Creator**: Maël Nison and the Yarn open source community (2020+).
- **Role**: A ground-up rewrite of Yarn focusing on eliminating `node_modules` entirely, enabling Zero-Installs, and offering plugin extensibility.
- **Key Concepts**:
  - **Plug'n'Play (PnP)**: Replaces `node_modules` with a compact dependency resolver map (`.pnp.cjs`) and packages stored in zip archives (`.yarn/cache`).
  - **Zero-Installs**: By committing compressed zip packages to git, `npm install` takes **0.0 seconds** on CI or fresh clones.
  - **Linker Flexibility**: Can switch to traditional `node-modules` or `pnpm` mode via `nodeLinker: node-modules` in `.yarnrc.yml`.
  - **Yarn Constraints**: Write declarative rules (via Prolog or JavaScript) to enforce consistent dependency versions across monorepos.
- **Strengths**: Fastest warm install times; zero disk clutter from uncompressed `node_modules`; strict dependency boundary checks.
- **Weaknesses**: Some tools with hardcoded `node_modules` filesystem expectations require workarounds or SDK setup (`@yarnpkg/sdks`).

### 4. pnpm (v9 - v11+)
- **Creator**: Zoltan Kochan and the pnpm community (2016+).
- **Role**: "Performant npm" — designed for maximum speed and extreme disk space savings without breaking `node_modules` compatibility.
- **Key Concepts**:
  - **Content-Addressable Global Store**: Identical files are stored once in `~/.local/share/pnpm/store`. Projects link to them via hard links.
  - **Isolated Symlink Structure**: Only direct dependencies listed in `package.json` are placed in the root of `node_modules`. Transitive dependencies reside inside `.pnpm/`.
  - **Monorepo Engine**: Fast workspace filtering (`pnpm --filter <app>... run test`), shared lockfile, and catalog dependencies.
- **Strengths**: Saves 60%–80% disk space across development machines; fastest cold install times; eliminates phantom dependencies while remaining 100% compatible with standard file paths.
- **Weaknesses**: Symlinks require developer mode on older Windows setups; strict peer dependency handling occasionally needs explicit configuration (`auto-install-peers=true`).

---

## Under the Hood: Resolution & Storage Architectures

### A. Flat Hoisted Tree (npm & Yarn Classic)

Both npm and Yarn Classic hoist dependencies up to the root `node_modules` to avoid deep directory nesting:

```text
my-project/
├── package.json (direct dep: express)
└── node_modules/
    ├── express/
    ├── debug/             <-- Hoisted to root from express!
    ├── accepts/           <-- Hoisted to root from express!
    └── cookie/            <-- Hoisted to root from express!
```

- **Problem**: Your code can run `require('debug')` even though you never declared `debug` in `package.json`!
- **Problem**: If another package requires an incompatible version of `debug`, it cannot be hoisted to the root and must be nested, duplicating files (the "Doppelganger" problem).

---

### B. Content-Addressable Store & Symlinks (pnpm)

pnpm uses **hard links** from a central store into `.pnpm/`, then **symlinks** direct dependencies to the root `node_modules`:

```text
my-project/
├── package.json (direct dep: express)
└── node_modules/
    ├── express  ───(symlink)───┐
    └── .pnpm/                  │
        └── express@4.19.2/ <───┘
            └── node_modules/
                ├── express (hard link to global store)
                └── debug   ───(symlink)──> .pnpm/debug@4.3.4/...
```

- **Safety**: Only `express` is in `./node_modules`. If you try to `require('debug')`, Node throws `Cannot find module 'debug'`.
- **Disk Efficiency**: If 10 projects use `lodash@4.17.21`, the 4MB files exist **once** on disk.

---

### C. Plug'n'Play / PnP (Yarn Modern)

Yarn Modern eliminates the `node_modules` folder altogether:

```text
my-project/
├── package.json
├── .pnp.cjs                 <-- In-memory dependency map
└── .yarn/
    └── cache/
        ├── express-npm-4.19.2-xxxx.zip
        └── debug-npm-4.3.4-xxxx.zip
```

- Node's runtime resolution is patched by `.pnp.cjs` to read directly from `.zip` archives.
- **Safety**: If `my-project` attempts to import `debug`, the PnP resolver intercepts the call and rejects it with an explicit declaration error.
- **Zero-Installs**: Check `.yarn/cache` into git; team members can run the project immediately after `git clone`.

---

## The Phantom Dependency & Doppelganger Problem

### 1. Phantom Dependency (Ghost Dependency)
A phantom dependency occurs when a project uses a package that is not listed in its `package.json`, but is available at runtime because a package manager hoisted it to `./node_modules`.

```mermaid
flowchart TD
    App["Your App (package.json)"] -->|Declares| A["Package A"]
    A -->|Depends on| B["Helper Lib B"]
    App -.->|Undeclared import: require('B')| B
    
    style B stroke:#f66,stroke-width:2px,stroke-dasharray: 5 5
```

- In **npm** and **Yarn Classic**: Hoisted to root `node_modules/B`. Code runs fine locally.
- **The Danger**: When `Package A` bumps its version and drops `B`, your app suddenly crashes in production with `MODULE_NOT_FOUND`.
- In **pnpm** and **Yarn Modern**: Blocked immediately at development time.

### 2. Doppelgangers
Occurs when the hoisting algorithm fails to deduplicate packages due to version conflicts, creating multiple identical or nearly identical copies across nested directory paths, bloating disk space and bundling duplicates into frontend bundles.

---

## Lockfile Comparison

| Property | `package-lock.json` | `yarn.lock` (Classic v1) | `yarn.lock` (Berry v2+) | `pnpm-lock.yaml` |
| :--- | :--- | :--- | :--- | :--- |
| **Format** | JSON | Custom line-based DSL | YAML | YAML |
| **Human Readability**| Moderate | Good | Excellent | Excellent |
| **Git Merge Conflicts**| Can be messy | Clean | Very clean | Very clean |
| **Integrity Checks** | SHA-512 hashes | SHA-1 / SHA-512 | SHA-512 hashes | SHA-512 hashes |
| **Package Tarball URLs**| Included | Included | Stripped (in PnP) | Stripped (store index) |

---

## Performance & Disk Space Benchmarks

*Simulated based on typical modern full-stack web applications (React 19 + Next.js 15 + TypeScript + Tailwind + ESLint, ~850 transitive packages):*

### Disk Usage Across Multiple Repositories

```text
Projects     npm (v10)     Yarn Classic    Yarn Modern (PnP)    pnpm
-------------------------------------------------------------------------
1 Project    420 MB        410 MB          165 MB (zips)        425 MB (store)
5 Projects   2.1 GB        2.05 GB         280 MB               480 MB (+13%)
10 Projects  4.2 GB        4.10 GB         450 MB               550 MB (+29%)
25 Projects  10.5 GB       10.25 GB        980 MB               720 MB (+69%)
```

### Installation Duration (Seconds)

```text
Operation                 npm       Yarn Classic   Yarn Modern    pnpm
-------------------------------------------------------------------------
Cold Install (No Cache)   24.5s     21.8s          14.2s          11.4s 🏆
Warm Install (Cached)     9.8s      8.9s           1.2s (PnP) 🏆  2.1s
Zero-Install (Git clone)  N/A       N/A            0.0s (PnP) 🏆  N/A
Add 1 dependency          6.2s      5.8s           2.3s           1.8s 🏆
```

---

## Monorepos & Workspaces

Modern JavaScript development heavily relies on monorepos. Here is how each handles them:

- **npm Workspaces**: Built-in support since npm v7. Configured via `"workspaces": ["packages/*"]` in the root `package.json`. Good for simple multi-package setups, but lacks advanced topological pipelining.
- **Yarn Classic Workspaces**: The pioneer that popularized JS monorepos. Supported by Lerna. Does not offer topological task orchestration natively without third-party tooling.
- **Yarn Modern Workspaces**: Sophisticated workspace features including `yarn workspaces foreach`, constraints engine, and release workflows.
- **pnpm Workspaces**: The de facto industry standard for large monorepos (used by Vue, Vite, Next.js, TanStack, Prisma). Configured via `pnpm-workspace.yaml`. Provides the fastest workspace filtering syntax (`pnpm --filter ...`) and catalog dependencies.

---

## CLI Command Translation Cheat Sheet

| Task | npm | Yarn Classic (v1) | Yarn Modern (Berry) | pnpm |
| :--- | :--- | :--- | :--- | :--- |
| **Install all** | `npm install` | `yarn install` | `yarn install` | `pnpm install` |
| **CI strict install** | `npm ci` | `yarn install --frozen-lockfile` | `yarn install --immutable` | `pnpm install --frozen-lockfile` |
| **Add dependency** | `npm i <pkg>` | `yarn add <pkg>` | `yarn add <pkg>` | `pnpm add <pkg>` |
| **Add dev dependency**| `npm i -D <pkg>` | `yarn add -D <pkg>` | `yarn add -D <pkg>` | `pnpm add -D <pkg>` |
| **Add exact version** | `npm i -E <pkg>` | `yarn add -E <pkg>` | `yarn add --exact <pkg>` | `pnpm add -E <pkg>` |
| **Remove package** | `npm uninstall <pkg>`| `yarn remove <pkg>` | `yarn remove <pkg>` | `pnpm remove <pkg>` |
| **Update all** | `npm update` | `yarn upgrade` | `yarn up` | `pnpm update` |
| **Interactive upgrade**| `npx npm-check-updates -i` | `yarn upgrade-interactive` | `yarn up -i` | `pnpm update -i --latest` |
| **Run script** | `npm run <cmd>` | `yarn <cmd>` | `yarn <cmd>` | `pnpm <cmd>` |
| **Execute binary** | `npx <pkg>` | `npx <pkg>` | `yarn dlx <pkg>` | `pnpm dlx <pkg>` |
| **Security audit** | `npm audit` | `yarn audit` | `yarn npm audit` | `pnpm audit` |
| **Deduplicate lock** | `npm dedupe` | `npx yarn-deduplicate` | `yarn dedupe` | `pnpm dedupe` |
| **Run in workspace** | `npm run <c> -w <p>` | `yarn workspace <p> <c>`| `yarn workspace <p> <c>` | `pnpm --filter <p> <c>` |
| **Run across workspaces**| `npm run <c> --ws` | `yarn workspaces run <c>`| `yarn workspaces foreach run <c>` | `pnpm -r run <c>` |
| **Clean cache** | `npm cache clean --force`| `yarn cache clean` | `yarn cache clean` | `pnpm store prune` |

---

## Decision Guide: Which Should You Use?

### 🟢 Choose **pnpm** if:
- You want the **best speed** and **maximum disk space savings**.
- You work with **monorepos** (pnpm is the preferred choice for Turborepo, Nx, and major OSS projects).
- You want **strict protection against phantom dependencies** without abandoning standard `node_modules` file paths.
- **Recommended for**: 80% of modern web applications, teams, and monorepos.

### 🟢 Choose **Yarn Modern (Berry)** if:
- You want **Zero-Installs** (checking dependencies into Git to eliminate `install` time in CI/CD).
- You want repo-wide architecture enforcement via **Yarn Constraints**.
- You are comfortable using PnP or configuring `nodeLinker: node-modules` where needed.
- **Recommended for**: Teams with large CI workloads wanting instantaneous pipeline execution.

### 🟢 Choose **npm** if:
- You want **zero setup friction** (ships pre-installed with Node.js).
- You are building small standalone libraries, demos, or educational code.
- You maintain legacy codebases with fragile build tooling that breaks on symlinks.
- **Recommended for**: Quick prototypes, beginner tutorials, minimal infrastructure environments.

### 🔴 Avoid **Yarn Classic (v1)** for new projects:
- Yarn Classic has been in **maintenance mode** since 2020.
- Migrate existing Yarn v1 repositories to **pnpm** (usually a 5-minute migration) or upgrade to **Yarn Modern**.

---

## Running the Interactive Tools

This project includes zero-dependency interactive CLI tools and simulators:

```bash
# Display full comparative overview
node src/index.js

# Display comparison matrix
node src/index.js compare

# Display command cheatsheet
node src/index.js cheatsheet

# Explain internal resolution architectures
node src/index.js architecture

# Run phantom dependency interactive demonstration
node src/phantom-demo.js

# Run project advisor questionnaire
node src/advisor.js

# Run benchmark simulator
node src/benchmark-sim.js
```

Or using npm scripts:
```bash
npm start
npm run compare
npm run cheatsheet
npm run phantom-demo
npm run advisor
npm run benchmark
```
