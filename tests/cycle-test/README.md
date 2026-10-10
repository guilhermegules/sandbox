# cycle-test

A sandbox project demonstrating **circular dependency detection** in Java: an
intentionally tangled codebase (a classic `OrderService` ↔ `CustomerService`
cycle) plus three different tools that catch it.

## The intentional cycle

`OrderService`, `CustomerService`, and `PaymentService` reference each other:

```
OrderService --> CustomerService
CustomerService --> OrderService    (the circle closes here)
PaymentService --> OrderService
```

Why is this a problem?

* **Tight coupling**: neither class can be used, tested, or replaced in isolation.
* **Rigid design**: changing one service tends to ripple into the others.
* **Hidden runtime hazards**: e.g. a call chain that loops back on itself can
  cause infinite recursion or stack overflows.
* **Blocked evolution**: the two classes must effectively ship together forever.

## What this type of test looks like

The same cycle is detected three ways, at different granularities:

### 1. ArchUnit (unit test, class level) `src/test/.../ArchUnitCycleTest.java`

ArchUnit imports the compiled classes and lets you assert on their structure as
plain JUnit tests:

* `shouldDetectCircularDependencyBetweenOrderAndCustomer` proves both halves of
  the cycle exist (`getDirectDependenciesFromSelf()` in each direction).
* `shouldDetectClassesWithHighCoupling` reports classes with many incoming and
  outgoing dependencies.

Run with `gradle test`. This is "architecture as a unit test": the build fails
the moment someone reintroduces a forbidden dependency.

### 2. JDepend (CLI tool, package level) `src/main/.../JDependCycleDetector.java`

Uses the `jdepend.framework.JDepend` API to compute per package metrics:
afferent/efferent coupling, instability, distance from the main sequence, and
package cycles via `containsCycle()` / `collectCycle()`.

Note: JDepend only sees cycles *between packages*. Since every demo class lives
in `cycle.test`, it correctly reports no package cycle here; move the services
into separate sub packages and it will flag one. It also ships a hand rolled
bytecode parser that predates modern class files, hence `options.release = 8`
in `build.gradle`.

### 3. JDeps (JDK built-in, class level) `src/main/.../JDepsCycleDetector.java`

Wraps the JDK's own `jdeps -verbose:class -filter:none` command and parses its
output to list internal dependency edges, then reports reciprocal pairs as
cycles. On this codebase it finds:

```
cycle.test.CustomerService <-> cycle.test.OrderService
```

Gotcha: `jdeps` filters out same package dependencies *by default*
(`-filter:package`), which silently hides exactly the edges we care about, so
`-filter:none` is required.

## Running

```bash
# main demo (prints the cycle in action)
gradle run

# ArchUnit structural tests
gradle test

# JDepend analysis of the compiled classes
gradle run -PmainClass=cycle.test.JDependCycleDetector

# JDeps analysis of the compiled classes
gradle run -PmainClass=cycle.test.JDepsCycleDetector
```

Both detectors accept an optional argument: a directory of `.class` files to
analyze (default: `build/classes/java/main`). Run `gradle classes` first if you
point them elsewhere.

## Build notes

* Built with Gradle 9.x; requires Java 8 bytecode compatibility
  (`options.release = 8`) so JDepend's old parser can read the classes.
* ArchUnit 1.5.0 is required on JDK 25+: older versions bundle an ASM release
  too old for modern class file versions and silently import nothing.
* Gradle 9 needs `org.junit.platform:junit-platform-launcher` declared
  explicitly as a `testRuntimeOnly` dependency.
