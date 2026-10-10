# IF Alternatives

Fourteen ways to write a decision, side by side. Each technique is a small runnable demo on its own
domain, and the tests double as the catalogue of each technique's failure mode.

> **Scope**
> These are alternatives, not a ranking. Most decisions are correctly written as a plain `if`, and
> the point of the exercise is knowing when a different technique earns its extra cost. Each entry
> below records what the technique buys and what it costs, so the choice can be made deliberately.
>
> Inspired by [The Anti-IF Campaign](https://francescocirillo.com/products/the-anti-if-campaign).

## Why this exists

A decision can be expressed in many ways, from an `if` inside a method to a rule service backed by a
database and an admin UI. Those options fall into three broad schools of thought:

| School               | Style                                                          | Where the decision lives |
| -------------------- | -------------------------------------------------------------- | ------------------------ |
| **Procedural**       | C-style, steps in order                                         | In the method body        |
| **Object Oriented**  | DDD, pure objects, [Elegant Objects](https://www.yegor256.com/) | In the objects            |
| **Generic**          | Generic data structures, dynamic techniques                      | In data / metadata        |

The differences run from compile-time type checking to runtime dispatch. Much of the choice is
taste. A common weighting in practice is to favour the compiler, because types move some verification
from the test suite to the build and shorten the feedback loop — but the tradeoff is real in both
directions, and hot paths and frequently changing rules tend to favour different ends of it.

Each technique below moves a decision somewhere specific. Tracking *where* it moved, and *what was
given up* to move it, is what the comparison is for.

## Build

- **Language level:** Java 25
- **Build:** Maven, JUnit Jupiter 6, zero runtime dependencies

```bash
mvn test                                            # 51 tests
mvn compile exec:java                               # run all 14 demos
mvn compile exec:java -Difalternatives.branch=feature/fix-coupon-order
mvn compile exec:java -Difalternatives.limits=/tmp/limits.properties
```

## Layout

```
src/main/java/com/example/ifalternatives/
├── Main.java              # runs the 14 demos in order
├── basic/                 # 1-3
├── generic/               # 4-9
├── elegant/               # 10-12
└── polymorphism/         # 13-14
src/main/resources/limits.properties
src/test/java/...          # one test class per category, nested per technique
```

## The 14 techniques

Every demo uses its own small domain, so the comparison stays about the *technique* rather than the
problem. The last column is the file to read.

### Basic Branches

| # | Technique                    | Pros                                                          | Cons                                                            | Demo                                                                                    |
| - | ---------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| 1 | **IFs**                      | Fast, nothing to learn, always available                       | Every new rule edits the same method; nesting and reading grow | [`IfExample`](src/main/java/com/example/ifalternatives/basic/IfExample.java)               |
| 2 | **Switch**                   | More compact than ifs; cases read as a table; can be exhaustive | Dispatches on one value, so ranges still need an if             | [`SwitchExample`](src/main/java/com/example/ifalternatives/basic/SwitchExample.java)     |
| 3 | **SCM branches** (git/svn/hg) | Sometimes the only option (no BC, no shared deployable)        | Both versions are never compiled together; the merge is the cost | [`ScmBranchExample`](src/main/java/com/example/ifalternatives/basic/ScmBranchExample.java) |

**1. IFs** is the baseline: one method, one branch per business rule. Adding a zone means editing
that method, and understanding the behaviour means reading all of it.

**2. Switch** shows why technique 2 does not replace technique 1. The severity switch is exhaustive
and needs no `default`, but `slaBand()` remains a chain of ifs — a switch dispatches on a single
value, and `minutes <= 15` is not a switch case. The `MEDIUM` case also nests a second switch,
which is the shape a decision on two values takes.

**3. SCM branches** cannot be expressed in Java at all. In a real project, V1 is built on `main` and
V2 on `feature/fix-coupon-order`, each branch produces its own artifact, and the merge is where it
hurts — nothing in the build checks that V2 still honours V1's contract. The demo builds the JVM
equivalent: two engines plus a `-D` flag, which is the only way to have both versions compiled in a
single process. The real workflow:

```bash
git switch -c feature/fix-coupon-order
# ... edit, commit
mvn compile exec:java          # main:  total=274.56
mvn compile exec:java -Difalternatives.branch=feature/fix-coupon-order   # total=247.10
git switch main && git merge feature/fix-coupon-order    # <- the cost
```

### Generic Options

The decision moves into data or metadata. Concision improves; compile-time verification of the
branch generally does not.

| # | Technique    | Pros                                                    | Cons                                                                          | Demo                                                                                       |
| - | ------------ | ------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| 4 | **Enums**    | Concise; the type system knows the whole set            | Resolved at runtime by `valueOf(name)`; the name is the persistence format    | [`EnumExample`](src/main/java/com/example/ifalternatives/generic/EnumExample.java)           |
| 5 | **Maps**     | Compact; adding a rule is adding an entry              | Hash lookup instead of a jump table; keys are unvalidated objects             | [`MapExample`](src/main/java/com/example/ifalternatives/generic/MapExample.java)             |
| 6 | **Properties** | Rules change without a deploy                        | Depends on the disk; a bundled resource is immutable inside a jar              | [`PropertiesExample`](src/main/java/com/example/ifalternatives/generic/PropertiesExample.java) |
| 7 | **Reflection** | One call site can drive any number of loaded rules    | Slower and harder to read; a method rename compiles and fails at runtime       | [`ReflectionExample`](src/main/java/com/example/ifalternatives/generic/ReflectionExample.java) |
| 8 | **Annotations** | Declarative; dispatch code stops growing            | Needs a scan plus a cache; an unannotated class is skipped silently            | [`AnnotationExample`](src/main/java/com/example/ifalternatives/generic/AnnotationExample.java) |
| 9 | **Math**     | Fast; no ifs; the least code of the fourteen           | Stops being obvious quickly, and mistakes surface at runtime                   | [`MathExample`](src/main/java/com/example/ifalternatives/generic/MathExample.java)           |

**4. Enums** — each constant carries its own rule through an abstract method per constant:

```java
enum Payment {
    CARD   { BigDecimal fee() { return new BigDecimal("0.00"); } BigDecimal maxAmount() { return new BigDecimal("5000.00"); } },
    PAYPAL { BigDecimal fee() { return new BigDecimal("2.90"); } BigDecimal maxAmount() { return new BigDecimal("2000.00"); } };
    abstract BigDecimal fee();
    abstract BigDecimal maxAmount();
}
```

The cost here is not in the code but in the data. `valueOf(name)` is the persistence format, so a
constant renamed from `DEBIT_CARD` to `CARD` makes every stored row fail at runtime. The demo loads a
`DEBIT_CARD` row and lets it throw. Reordering constants is the same hazard without the rename.

**5. Maps** — the decision becomes a lookup, and the miss is the interesting part:

```java
static Optional<BigDecimal> discountFor(String couponCode) {
    if (couponCode == null) { return Optional.empty(); }
    return Optional.ofNullable(DISCOUNTS.get(couponCode.trim().toUpperCase()));
}
```

`"WELCOME1O"` (letter O) is a valid key that matches nothing, and the compiler is silent. Typing the
key as an enum would restore the check, at which point this is technique 4 with a map's lookup cost.

**6. Properties** — the rules leave the code, which is the point, and land in a file, which is the
cost. A resource inside a jar is immutable, so a library shipping `limits.properties` cannot be
tuned by its consumers; the only escape hatch is an external file. A misspelled key is not an error
either — it is a `null`, which becomes a zero when a default is supplied and an exception three
frames later when one is not.

**7. Reflection** — the branch is a method name in a `String`:

```java
static BigDecimal apply(String policyName, BigDecimal total) throws ReflectiveOperationException {
    return (BigDecimal) resolve(policyName).invoke(null, total);
}
```

The demo runs a config containing `full-discount`, the name a method has *after* a kebab-case
refactor. It compiles, it deploys, and it throws `NoSuchMethodException` on the first call. The
`CACHE` exists because scanning `getDeclaredMethods()` on every call is expensive. The same dynamic
call site also accepts a wrong argument type, failing as `IllegalArgumentException` at invoke time.

**8. Annotations** — the rule is declared on a class and discovered once into a registry, so the
dispatch code stops growing. Two costs show up in the demo: a class missing the annotation is
skipped *silently* (no compiler can catch a runtime-only mistake), and the scan needs a cache. The
related variant is an **annotation processor**, which does the same discovery at build time, when
the compiler can still fail on a bad rule.

**9. Math** — no ifs at all. `Math.max(0, Math.min(3, points / 1000 - 1))` is a clamp, and it reads
as one. The limit appears where the expression stops being obvious: `surchargeFor` indexes an array
by `Integer.numberOfTrailingZeros(mask)`, and a new flag with no table entry fails with
`ArrayIndexOutOfBoundsException` rather than a compile error.

### Elegant Options

Readability is prioritised here; throughput and allocation are not the goal.

| # | Technique                                  | Pros                                                  | Cons                                                     | Demo                                                                                            |
| - | ------------------------------------------ | ----------------------------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| 10 | **IF Objects**                             | Call site reads as a table; conditions reusable        | One object per condition per call                        | [`IfObjectExample`](src/main/java/com/example/ifalternatives/elegant/IfObjectExample.java)       |
| 11 | **Functional** (predicates, functions)     | Granular, testable pieces; composable                 | More complex; the branches move into the JDK             | [`FunctionalExample`](src/main/java/com/example/ifalternatives/elegant/FunctionalExample.java)   |
| 12 | **Composable Decorators** (Elegant Objects) | Pure OO; wrappers compose with any other wrapper      | One object per wrapper; assembly order is invisible       | [`DecoratorExample`](src/main/java/com/example/ifalternatives/elegant/DecoratorExample.java)     |

**10. IF Objects** — every condition becomes a named object and the decision becomes a list:

```java
private static final List<Route> ROUTES = List.of(
        new Route("blocked", a -> a.blocklisted(), "manual review"),
        new Route("fraud-watch", a -> a.recentFailures() >= 3, "hold and call"),
        new Route("vip", a -> a.tier() == Tier.VIP, "dedicated agent"),
        new Route("senior", a -> a.age() >= 65, "priority queue"));

static String routeOf(Applicant applicant) {
    for (Route route : ROUTES) {
        if (route.holds(applicant)) { return route.name(); }
    }
    return "standard";
}
```

The `if` is still present — it is just no longer inline. What this adds is real: the conditions
become a readable table, each is unit testable on its own, and `priorityOf` reuses the same five
objects for a second decision. What it costs is one object per condition per call.

**11. Functional** — the same shape built from `Predicate`/`Function`/`Supplier`, which adds lazy
evaluation (`orElseGet` builds the fallback only when nothing matched) and composition
(`TAX.andThen(ROUND_DOWN)`). The cost is that the branches move into the JDK: `Stream.filter`,
`Optional.orElse` and `Function.andThen` are all branches not written here, and a stream plus a
lambda per rule is slower than the `if` it replaces.

**12. Composable Decorators** — each rule wraps the previous one, so the assembly order *is* the
decision:

```java
new Discount(new ShippingFee(subtotal, FEE), DISCOUNT)   // 210.33
new ShippingFee(new Discount(subtotal, DISCOUNT), FEE)   // 210.82
```

Same cart, same rules, different total, because the fee is additive and the discount multiplies.
The type system cannot express that difference; only the reader of the composition can.

### Polymorphism + Type System

Here the decision is carried by the data, and the language enforces it.

| # | Technique                      | Pros                                                             | Cons                                                                | Demo                                                                                                     |
| - | ------------------------------ | ---------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| 13 | **Reflection and InstanceOf**  | More structured than a name lookup; the data stays typed         | More complex; `instanceof` is resolved at runtime                   | [`InstanceOfExample`](src/main/java/com/example/ifalternatives/polymorphism/InstanceOfExample.java)       |
| 14 | **Type System + Polymorphism** | Simple, OO, fast; consumers hold no branch; `sealed` closes the set | The factory still branches — the outside world is a string | [`PolymorphismExample`](src/main/java/com/example/ifalternatives/polymorphism/PolymorphismExample.java) |

**13. Reflection and InstanceOf** — dispatch on the runtime type with `instanceof` patterns, then the
same decision as a switch with record patterns:

```java
static String routeWithPattern(Notification notification) {
    return switch (notification) {
        case Email(String to, String subject, String body) -> "smtp -> " + to + " (" + body.length() + " chars)";
        case Sms(String phone, String body) -> "gateway -> " + phone + " (" + body + ")";
        case Push push -> "fcm -> " + push.device();
        default -> "unsupported";
    };
}
```

The cost is the `default`. The hierarchy in this demo is deliberately **not** sealed, so
`InstanceOfExample.Unknown` exists, compiles, deploys, and quietly becomes `"unsupported"` in both
dispatch styles. Nothing failed at build time — which is the difference from technique 14.

**14. Type System + Polymorphism** — each subtype carries its own rule, so consumers have no branch
at all, and `sealed` makes the set of subtypes a closed universe:

```java
sealed interface Shipping { ... }
record International() implements Shipping {
    @Override
    public Quote quote(Parcel parcel) {
        BigDecimal amount = baseRate(this, parcel);
        if (parcel.declaredValue().compareTo(new BigDecimal("500")) > 0) {   // <- the rule travels with the data
            amount = money(amount.add(new BigDecimal("12.00")));
        }
        return new Quote(amount, slaDays());
    }
}
```

Adding a `Drone` record makes every non-exhaustive switch in the codebase stop compiling, which is
the whole difference from technique 13. One branch remains unavoidable, because the outside world
arrives as a string in the database rather than a type:

```java
static Shipping of(String carrier) {
    return switch (carrier) {
        case "LOCAL" -> new Local();
        case "NATIONAL" -> new National();
        case "INTERNATIONAL" -> new International();
        default -> throw new IllegalArgumentException("Unknown carrier: " + carrier);
    };
}
```

The practical guidance is to keep that translation in one small, obvious place and fail fast on the
unknown value, leaving every other decision with the data it describes.

## Performance cost of the Elegant Options

Techniques 10-12 trade CPU and memory for readability. That is a reasonable choice when it is made
deliberately.

| You spend            | On                                            | You buy                       |
| -------------------- | --------------------------------------------- | ----------------------------- |
| One object per rule  | Heap, allocated per call in 10 and 11         | A decision table you can read |
| `Stream` + lambdas   | Allocation per stage, megamorphic call sites | Composable, testable pieces   |
| Object per wrapper   | One more indirection per decorator            | Order-independent assembly    |
| Reflection / runtime | Class metadata scan, `Method.invoke`          | A rule engine in a few lines  |

These tend to fit decisions that change often and are not on the hot path. Techniques 1 and 9 remain
reasonable when throughput is the dominant constraint and the branch is straightforward.

## Tradeoffs checklist

Worth walking before choosing. The questions are the uncomfortable half of the decision.

**Null and corner cases**
- Resolve it here, add more ifs, push it to the consumer, or handle it in a decorator?
- Empty object / `Optional` / monad, or plain `null`?
- Is it recoverable, and what does recovery cost?

**Fail fast vs fail safe**
- Crash or degrade?
- Fail fast (throw, stop, alert) vs fail safe (default, degrade, retry)?
- Is the condition an *error* or an *exception*? Checked or unchecked?
- One exception type for everything, or several? Which ones, and why?

**What are you going to do with it?**
- Rate of change: daily, weekly, monthly, quarterly, yearly?
- Who changes it: a developer, ops, or a customer through an admin UI?
- Why does it change, and can the change be additive?

**Controlled vs growing complexity**
- Does the code grow as conditions are added?
- How many places need touching to add one?

**Optimizations**
- RPC or batch?
- Cache — eager or lazy, on demand?
- Does the decision belong on the client, the server, or the BFF?

**School of thought**
- OOP, FP, generic; compile-time or dynamic?
- What does the team prefer, and why?
- Is that preference about the language, or about the last project that went badly?

A reasonable starting point while still deciding: **compile-time over runtime, type system over
string keys, fail fast over silent defaults** — unless an answer above argues otherwise.

## Tests

One test class per category, one nested class per technique, 51 tests total. They assert the decision
each technique makes **and** the failure mode its cons describe:

| Technique   | The edge case under test                                                             |
| ----------- | ------------------------------------------------------------------------------------ |
| Ifs         | Unknown zone fails fast with `IllegalArgumentException`                              |
| Switch      | `slaBand` ranges still need an if                                                    |
| SCM         | Branch flag selects the engine; an unknown branch fails fast                          |
| Enums       | A constant renamed in code breaks the persisted row                                  |
| Maps        | A typo key and `null` are both silent runtime misses                                 |
| Properties  | A missing resource returns empty rather than null; an override keeps untouched keys  |
| Reflection  | A renamed method throws `NoSuchMethodException`; a wrong argument throws `IllegalArgumentException` |
| Annotations | The unannotated class is skipped without a warning                                   |
| Math        | An unmapped flag bit throws `ArrayIndexOutOfBoundsException`                         |
| IF objects  | Earlier conditions outrank later ones                                                |
| Functional  | `frozen` outranks overdrawn, dormant and vip                                         |
| Decorators  | Assembly order changes the total                                                     |
| InstanceOf  | An unhandled subtype falls through `default`                                         |
| Polymorphism | An unknown carrier fails fast; customs applies only above the threshold              |

## Links

- [The Anti-IF Campaign](https://francescocirillo.com/products/the-anti-if-campaign)
- Related projects in this repo: [`../patternmatching`](../patternmatching) (switch/record patterns),
  [`../sealedclasses`](../sealedclasses) (sealed hierarchies), [`../functional`](../functional)
  (functional style), [`../exceptions`](../exceptions) (error policy)
