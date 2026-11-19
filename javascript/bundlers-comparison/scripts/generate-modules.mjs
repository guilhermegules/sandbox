#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const TARGET_BUNDLERS = ['vite', 'esbuild', 'rspack', 'rsbuild', 'webpack', 'gulp'];
const MODULE_COUNT = parseInt(process.argv[2] || '100', 10);

console.log(`Generating ${MODULE_COUNT} synthetic modules for each bundler...`);

for (const bundler of TARGET_BUNDLERS) {
  const genDir = path.join(rootDir, bundler, 'src', 'generated');
  if (fs.existsSync(genDir)) {
    fs.rmSync(genDir, { recursive: true, force: true });
  }
  fs.mkdirSync(genDir, { recursive: true });

  const imports = [];
  const exports = [];

  for (let i = 1; i <= MODULE_COUNT; i++) {
    const modCode = `// Generated module #${i}
export function calculateModule_${i}(x) {
  return (x * ${i}) + Math.sin(${i});
}

export const METADATA_${i} = {
  id: ${i},
  tag: 'SYNTHETIC_NODE_${i}',
  timestamp: ${Date.now() + i}
};
`;
    fs.writeFileSync(path.join(genDir, `module_${i}.js`), modCode, 'utf-8');
    imports.push(`import { calculateModule_${i}, METADATA_${i} } from './module_${i}.js';`);
    exports.push(`calculateModule_${i}, METADATA_${i}`);
  }

  // Write index for generated modules
  const indexCode = `${imports.join('\n')}\n\nexport const AllModules = [\n  ${Array.from({ length: MODULE_COUNT }, (_, i) => `calculateModule_${i + 1}`).join(',\n  ')}\n];\n`;
  fs.writeFileSync(path.join(genDir, 'index.js'), indexCode, 'utf-8');
  console.log(`✓ Created ${MODULE_COUNT} modules in ./${bundler}/src/generated/`);
}

console.log(`\nCompleted! You can now import { AllModules } from './generated/index.js' to stress-test bundling speed.\n`);
