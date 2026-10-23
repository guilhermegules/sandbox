/**
 * Interactive demonstration and simulator of the "Phantom Dependency" problem.
 * Also known as "Ghost Dependencies" or "Doppelgangers".
 */

export function runPhantomDemo() {
  console.log('\n' + '='.repeat(80));
  console.log('   👻 THE PHANTOM DEPENDENCY (GHOST DEPENDENCY) DEMONSTRATION');
  console.log('='.repeat(80) + '\n');

  console.log(`📌 SCENARIO:
Your application uses an HTTP framework like 'express'.
Express internally depends on a helper library called 'debug'.

Your app's package.json:
{
  "name": "my-cool-app",
  "dependencies": {
    "express": "^4.19.2"
    // ⚠️ Notice: "debug" IS NOT DECLARED HERE!
  }
}

Now, a developer on your team writes:
  const debug = require('debug')('app:auth');
`);

  console.log('-'.repeat(80));
  console.log('1️⃣  BEHAVIOR IN npm & YARN CLASSIC (Flat Hoisting):');
  console.log('-'.repeat(80));
  console.log(`
  my-cool-app/
  ├── package.json (express only)
  └── node_modules/
      ├── .bin/
      ├── express/
      ├── debug/            <-- ⚠️ HOISTED TO ROOT!
      ├── accepts/
      └── cookie/

  What happens when code runs:
  > require('debug')  ==>  RESOLVED! ✅
  
  ⚠️ The Problem:
  - This is a "Phantom Dependency" (or "Ghost Dependency").
  - The app worked purely by coincidence because npm/yarn hoisted it to the root!
  - If tomorrow 'express' updates and replaces 'debug' with something else:
    💥 PRODUCTION CRASH: Error: Cannot find module 'debug'
  - Or if another developer runs a clean install with a different resolution order:
    💥 INCONSISTENT BUILDS across team members.
`);

  console.log('-'.repeat(80));
  console.log('2️⃣  BEHAVIOR IN pnpm (Isolated Symlinked Structure):');
  console.log('-'.repeat(80));
  console.log(`
  my-cool-app/
  ├── package.json (express only)
  └── node_modules/
      ├── express -> .pnpm/express@4.19.2/node_modules/express
      └── .pnpm/
          └── express@4.19.2/
              └── node_modules/
                  ├── express/
                  └── debug -> .pnpm/debug@4.3.4/node_modules/debug

  What happens when code runs:
  > require('debug')  ==>  ❌ Error: Cannot find module 'debug'!
  
  🛡️ Protection:
  - Only packages explicitly listed in 'my-cool-app/package.json' exist in the root node_modules!
  - 'debug' is strictly isolated inside express's nested scope.
  - You are forced to declare all direct dependencies, preventing phantom production failures.
`);

  console.log('-'.repeat(80));
  console.log("3️⃣  BEHAVIOR IN YARN MODERN (Plug'n'Play / PnP):");
  console.log('-'.repeat(80));
  console.log(`
  my-cool-app/
  ├── package.json (express only)
  ├── .pnp.cjs (Exact dependency dependency resolution map)
  └── (NO node_modules folder at all!)

  What happens when code runs:
  > require('debug')  ==>  ❌ Qualified Error:
     "my-cool-app tried to access debug, but it isn't declared in its dependencies."
  
  🛡️ Protection:
  - The custom PnP runtime resolver verifies every import against package.json bounds.
  - Complete guarantee against phantom dependencies and phantom peer dependencies.
`);

  console.log('='.repeat(80));
  console.log('📊 SUMMARY TABLE:');
  console.log('='.repeat(80));
  console.log('Package Manager | Phantom Protection | How It Works');
  console.log('-'.repeat(80));
  console.log('npm             | ❌ None             | Flat hoisting exposes all transitive deps');
  console.log('Yarn Classic    | ❌ None             | Flat hoisting exposes all transitive deps');
  console.log('pnpm            | ✅ Strict           | Root node_modules contains only declared deps');
  console.log('Yarn Modern     | ✅ Strict (PnP)     | In-memory resolution maps verified on import');
  console.log('='.repeat(80) + '\n');
}

// Allow direct CLI execution
if (process.argv[1]?.endsWith('phantom-demo.js')) {
  runPhantomDemo();
}
