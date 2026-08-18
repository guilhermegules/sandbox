# Pattern Matching (Java 25)

Learning project for pattern matching features in Java 25.

## Topics covered

| File                    | Feature                              | Java version |
| ----------------------- | ------------------------------------ | ------------ |
| `InstanceOfPatterns`    | `instanceof` type patterns + scoping | 16 (final)   |
| `SwitchPatterns`        | switch type patterns, null, sealed   | 21 (final)   |
| `RecordPatterns`        | record patterns, nested destructuring| 21 (final)   |
| `GuardedPatterns`       | guarded patterns (`when`)            | 21 (final)   |
| `PrimitivePatterns`     | primitive patterns in switch         | 25 (preview) |

## Basic concepts

### 1. `instanceof` patterns

```java
if (obj instanceof String s) {
    return s.length();   // s is in scope and already cast
}
```

Pattern variable `s` is only in scope where the pattern matched (flow scoping).
Combine with `&&` for narrowing:

```java
if (obj instanceof String s && !s.isEmpty()) { ... }
```

### 2. Switch type patterns

Switch can dispatch on the runtime type:

```java
return switch (shape) {
    case Circle c -> c.area();
    case Square s -> s.area();
    case Triangle t -> t.area();
};
```

- `null` handled explicitly: `case null -> ...`
- With sealed hierarchies the switch is exhaustive — no `default` needed
- Order matters: a more specific type must come before a more general one
  (`case Integer` before `case Number`), otherwise it is *dominated*

### 3. Record patterns

Deconstruct records, including nested:

```java
case Segment(Point(int x1, int y1), Point(int x2, int y2)) -> ...
```

Use `var` to avoid naming types: `case Segment(var start, var end) -> ...`

### 4. Guarded patterns

Add an extra condition with `when`:

```java
case Circle c when c.radius() < 1 -> "tiny circle";
case Circle c -> "normal circle";
```

The guarded case is tried first; fall through to the next matching case otherwise.

### 5. Primitive patterns (preview)

Java 25 adds patterns for primitive types like `int`, `long`, `double`:

```java
switch (value) {
    case 0 -> "zero";
    case int n when n < 0 -> "negative";
    default -> "other";
}
```

## Compiling / running

Preview features need a flag:

```bash
# javac directly
javac --release 25 --enable-preview -d out $(find src -name '*.java')
java --enable-preview -cp out com.example.Main

# maven
mvn compile exec:java -Dexec.mainClass=com.example.Main
```
