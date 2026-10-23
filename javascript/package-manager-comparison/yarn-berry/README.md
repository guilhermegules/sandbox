# Yarn Modern / Berry (v2 - v4+) 🍇

This folder demonstrates a project configured for **Yarn Modern (Berry)**.

## Overview
- **Rewrite**: Complete ground-up rewrite starting with Yarn v2 and active in Yarn v4+.
- **Plug'n'Play (PnP)**: Replaces `node_modules` with `.pnp.cjs` mapping and `.yarn/cache` zips.
- **Zero-Installs**: By committing compressed zip files to git, CI builds skip `yarn install` completely.
- **Lockfile**: Uses modern YAML-formatted `yarn.lock`.
- **Yarn Constraints**: Write declarative rules in JavaScript/Prolog to enforce repo standards.

## Common Commands
```bash
# Install dependencies
yarn install (or yarn)

# Immutable install in CI (replaces --frozen-lockfile)
yarn install --immutable

# Add a runtime or dev dependency
yarn add <pkg>
yarn add -D <pkg>

# Update dependencies
yarn up
yarn up -i

# Run arbitrary binary without installing
yarn dlx <package-name>

# Run across all monorepo workspaces
yarn workspaces foreach run <command>
```

## Structure Highlights
- [package.json](file:///home/guilherme/workspace/sandbox/javascript/package-manager-comparison/yarn-berry/package.json): Configured with `packageManager: "yarn@4.4.1"`.
- [.yarnrc.yml](file:///home/guilherme/workspace/sandbox/javascript/package-manager-comparison/yarn-berry/.yarnrc.yml): YAML configuration specifying `nodeLinker: pnp` and cache options.
- [yarn.lock](file:///home/guilherme/workspace/sandbox/javascript/package-manager-comparison/yarn-berry/yarn.lock): Version 8 YAML lockfile format.
