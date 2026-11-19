# Yarn Classic (v1.22.x) 🧶

This folder demonstrates a project configured for **Yarn Classic (v1)**.

## Overview
- **Status**: Formally frozen and in **maintenance mode** since 2020.
- **Lockfile**: Uses custom line-based `yarn.lock` format (version 1).
- **Resolution Strategy**: Flat `node_modules` with hoisting.
- **Dependency Overrides**: Configured via the `"resolutions"` field in `package.json`.

## Common Commands
```bash
# Install dependencies
yarn install (or yarn)

# Frozen install in CI
yarn install --frozen-lockfile

# Add a runtime or dev dependency
yarn add <pkg>
yarn add -D <pkg>

# Interactive upgrade
yarn upgrade-interactive

# Run scripts
yarn <script-name>
```

## Migration Guidance
Yarn Classic does not receive performance enhancements or modern storage optimizations.
- To migrate to **pnpm**: run `pnpm import` to convert `yarn.lock` directly into `pnpm-lock.yaml`.
- To upgrade to **Yarn Modern**: run `yarn set version stable`.

## Structure Highlights
- [package.json](file:///home/guilherme/workspace/sandbox/javascript/package-manager-comparison/yarn-classic/package.json): Classic setup with `resolutions`.
- [.yarnrc](file:///home/guilherme/workspace/sandbox/javascript/package-manager-comparison/yarn-classic/.yarnrc): Concurrency and lockfile configuration.
- [yarn.lock](file:///home/guilherme/workspace/sandbox/javascript/package-manager-comparison/yarn-classic/yarn.lock): Version 1 lockfile.
