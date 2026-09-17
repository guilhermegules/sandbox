# Build Tools Comparison: Maven vs Gradle vs Bazel

A single Java application, built three different ways. The `maven/`, `gradle/`, and `bazel/`
subprojects contain **identical sources** (`Greeter`, `Main`, `GreeterTest`) so the only
thing being compared is the build tool.

- **Language level:** Java 25
- **App:** `com.example.buildtools.Greeter` uses Apache Commons Lang 3 (`StringUtils.capitalize`)
- **Test framework:** JUnit Jupiter 6.0.0 (4 tests)
- **External dependency:** `org.apache.commons:commons-lang3:3.17.0`

## Shared sources

```
src/main/java/com/example/buildtools/{Greeter.java, Main.java}
src/test/java/com/example/buildtools/GreeterTest.java
```

Each tool enforces a different source layout for these same files:

```
maven/   src/main/java/  src/test/java/          # conventional layout
gradle/  src/main/java/  src/test/java/          # same conventional layout
bazel/   src/main/java/  src/test/java/          # any layout (build file lists what to compile)
```

## Maven — `maven/`

Declarative, XML, convention-over-configuration. Lifecycle-driven.

`pom.xml` highlights:

```xml
<properties>
    <maven.compiler.release>25</maven.compiler.release>
</properties>

<dependencyManagement>
    <!-- BOM import: versions centralized, like Gradle platform() -->
    <dependency>org.junit:junit-bom:6.0.0</dependency>
</dependencyManagement>
```

```bash
mvn test                                   # compile + run tests
mvn clean test                             # clean and re-test
mvn exec:java -Dexec.args="guilherme"      # run Main
mvn package                                # build jar (target/*.jar)
```

- Configuration is **data, not code**: ordering is fixed by the lifecycle, no custom logic.
- The whole build is a graph of goals bound to phases (`validate` → `compile` → `test` → `package` → ...).
- Critical path / incremental behavior is managed via plugins (compiler/surefire) and is the least flexible of the three.

## Gradle — `gradle/`

Groovy (or Kotlin) DSL. Task graph with incremental build, caching, and a long-lived daemon.

`build.gradle` highlights:

```groovy
java {
    toolchain { languageVersion = JavaLanguageVersion.of(25) }   // picks a JDK 25, auto-provisionable
}

dependencies {
    implementation 'org.apache.commons:commons-lang3:3.17.0'

    testImplementation platform('org.junit:junit-bom:6.0.0')     // equivalent of dependencyManagement
    testImplementation 'org.junit.jupiter:junit-jupiter'
    testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
}

tasks.named('test') { useJUnitPlatform() }
```

```bash
./gradlew test                                # compile + run tests (daemon, up-to-date checks)
./gradlew clean test
./gradlew run --args="guilherme"              # application plugin
./gradlew build                               # jar + tests + reports
```

- **Wrapper** (`gradlew` + `gradle/wrapper/`) pins the exact Gradle version per project — no global install needed.
- Gradle is a **programming model**: build files are executable; easy to add custom task logic/ordering.
- Configuration cache and the daemon make repeated builds fast, but the learning curve is higher than Maven.

## Bazel — `bazel/`

Hermetic, multi-language, Google-origin. Everything is a target in a `BUILD` file; deps must be declared explicitly.

`MODULE.bazel` (Bzlmod) highlights — Bazel 9's module system:

```python
bazel_dep(name = "rules_java", version = "9.9.0")
bazel_dep(name = "rules_jvm_external", version = "7.1")

maven = use_extension("@rules_jvm_external//:extensions.bzl", "maven")
maven.install(
    name = "maven",
    artifacts = [
        "org.apache.commons:commons-lang3:3.17.0",
        "org.junit.jupiter:junit-jupiter-api:6.0.0",
        # ...
    ],
)
use_repo(maven, "maven")
```

`BUILD.bazel` highlights:

```python
java_library(name = "greeter", srcs = [...], deps = ["@maven//:org_apache_commons_commons_lang3"])
java_binary(name = "main",    srcs = [...], main_class = "com.example.buildtools.Main", deps = [":greeter"])
java_test(
    name = "greeter-test",
    use_testrunner = False,
    main_class = "org.junit.platform.console.ConsoleLauncher",  # JUnit Platform 6 CLI
    args = ["execute", "--select-class", "com.example.buildtools.GreeterTest"],
    deps = [":greeter", "@maven//:org_junit_platform_junit_platform_console"],  # transitive via jars
)
```

`.bazelversion` pins Bazel via **Bazelisk** (the bazel analog of the Gradle wrapper).

```bash
bazel test //...                              # compile + run every *_test target
bazel run //:main -- guilherme                # run the java_binary
bazel build //...                             # build everything
bazel clean                                   # drop local outputs
```

- True **hermeticity**: sandboxed actions, strict visibility, explicit deps — no hidden transitive classpath.
- **Remote-cache friendly** by design; incremental builds track file content (hashes), not timestamps.
- Nothing is automatic: you list `srcs`, `deps`, `data` yourself. Highest upfront cost, most control. Built for multi-language monorepos.

## Command equivalence

| Task                      | Maven                          | Gradle                  | Bazel                |
|---------------------------|--------------------------------|-------------------------|----------------------|
| Compile + test            | `mvn test`                     | `./gradlew test`        | `bazel test //...`   |
| Clean + test              | `mvn clean test`               | `./gradlew clean test`  | `bazel clean`        |
| Build artifact            | `mvn package`                  | `./gradlew build`       | `bazel build //main` |
| Run `Main`                | `mvn exec:java -Dexec.args="x"`| `./gradlew run --args="x"` | `bazel run //:main -- x` |
| Dependency management     | `pom.xml` + Ivy-style resolver | `build.gradle` + repos  | `MODULE.bazel` + `rules_jvm_external` |
| Version pinning           | (via toolchain/plugin props)   | Gradle wrapper          | Bazelisk `.bazelversion` |
| Test reports              | `target/surefire-reports/`     | `build/reports/tests/`  | `bazel-testlogs/`    |

## Observations from building the same app three ways

- **Setup ceremony:** Maven is the least (a `pom.xml` and it works). Gradle wants a wrapper
  (`gradle wrapper`). Bazel wants `MODULE.bazel` + `BUILD.bazel` + `.bazelversion` +
  `.bazelrc` and pinned rule versions — the most moving parts.
- **Version pinning:** all three have a story (Maven responsible for the JDK;
  Gradle's wrapper pins Gradle; Bazelisk pins Bazel), but only Gradle and Bazel include
  it as a checked-in file that guarantees reproducibility for every teammate.
- **Dependency declaration:** Maven/Gradle resolve a whole tree from a short list; Bazel's
  `rules_jvm_external` generates per-artifact targets (`@maven//:org_...`) and you wire them
  into `deps` explicitly — more verbose, but the classpath is now explicit and auditable.
- **JUnit 6 note:** JUnit Platform 6.0 changed the `ConsoleLauncher` CLI to subcommands
  (`junit execute --select-class ...`). This only surfaced in Bazel, where the test runner is
  configured manually; Maven (Surefire) and Gradle talk to the JUnit Platform API and were unaffected.
- **Learning curve:** Maven < Gradle < Bazel. **Flexibility/control:** Bazel > Gradle > Maven.
  **Best ecosystem fit:** Gradle for single-language (JVM) apps, Maven for convention & CI simplicity,
  Bazel for large multi-language monorepos at scale.

## Reproducing this setup

```bash
# Tools used (via SDKMAN for Gradle & Maven, GitHub release for Bazelisk)
sdk install gradle 9.3.0
curl -L -o ~/.local/bin/bazelisk https://github.com/bazelbuild/bazelisk/releases/latest/download/bazelisk-linux-amd64 && chmod +x ~/.local/bin/bazelisk && ln -s bazelisk ~/.local/bin/bazel

# Maven
cd maven && mvn test

# Gradle (wrapper downloads Gradle 9.3.0 on first run)
cd gradle && ./gradlew test

# Bazel (Bazelisk reads .bazelversion and downloads Bazel 9.2.0 on first run)
cd bazel && bazel test //...
```