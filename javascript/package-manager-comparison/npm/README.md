# npm (Node Package Manager) 📦

This folder demonstrates a project configured for **npm (v10+)**.

## Overview
- **Default with Node.js**: Installed automatically with Node.js — zero setup required.
- **Lockfile**: Generates `package-lock.json` with `lockfileVersion: 3`.
- **Resolution Strategy**: Flat `node_modules` with hoisting.
- **Transitive Dependency Overrides**: Configured via the `"overrides"` key in `package.json`.

## Common Commands
```bash
# Install dependencies according to package.json & lockfile
npm install

# Fast, clean, strict install in CI/CD environments
npm ci

# Add a runtime or dev dependency
npm install <pkg>
npm install -D <pkg>

# Security auditing
npm audit
npm audit fix

# Run scripts
npm run <script-name>

# Execute remote or temporary binaries without installing
npx <package-name>
```

## Structure Highlights
- [package.json](file:///home/guilherme/workspace/sandbox/javascript/package-manager-comparison/npm/package.json): Standard configuration with `overrides`.
- [.npmrc](file:///home/guilherme/workspace/sandbox/javascript/package-manager-comparison/npm/.npmrc): Best-practice configuration flags (strict engine checks, audit flags).
- [package-lock.json](file:///home/guilherme/workspace/sandbox/javascript/package-manager-comparison/npm/package-lock.json): Version 3 lockfile with SHA-512 integrity hashes.
