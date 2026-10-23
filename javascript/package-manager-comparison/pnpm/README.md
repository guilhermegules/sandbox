# pnpm (Performant npm) ⚡

This folder demonstrates a project configured for **pnpm (v9 - v11+)**.

## Overview
- **Storage**: Global Content-Addressable Store (`~/.local/share/pnpm/store`). Identical files across projects are hard-linked.
- **Safety**: Non-flat `node_modules` structure completely prevents phantom (ghost) dependencies.
- **Monorepo Workspaces**: Standard `pnpm-workspace.yaml` definition and fast command filtering.
- **Lockfile**: YAML-formatted `pnpm-lock.yaml`.

## Common Commands
```bash
# Install all dependencies
pnpm install (or pnpm i)

# Frozen lockfile in CI
pnpm install --frozen-lockfile

# Add a runtime or dev dependency
pnpm add <pkg>
pnpm add -D <pkg>

# Interactive upgrade
pnpm update -i --latest

# Run across all monorepo workspaces
pnpm -r run <command>

# Run in specific package
pnpm --filter <pkg-name> <command>

# Prune unreferenced packages from global store
pnpm store prune
```

## Structure Highlights
- [package.json](file:///home/guilherme/workspace/sandbox/javascript/package-manager-comparison/pnpm/package.json): Configured with `packageManager: "pnpm@9.12.3"` and `pnpm.overrides`.
- [pnpm-workspace.yaml](file:///home/guilherme/workspace/sandbox/javascript/package-manager-comparison/pnpm/pnpm-workspace.yaml): Monorepo workspace glob pattern.
- [.npmrc](file:///home/guilherme/workspace/sandbox/javascript/package-manager-comparison/pnpm/.npmrc): Settings for peer dependencies and hoisting.
- [pnpm-lock.yaml](file:///home/guilherme/workspace/sandbox/javascript/package-manager-comparison/pnpm/pnpm-lock.yaml): Modern version 9 YAML lockfile.
