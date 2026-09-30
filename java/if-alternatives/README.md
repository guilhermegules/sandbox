# IF Alternatives

Fourteen ways to write a decision, side by side. Every technique is a small runnable demo, and the
tests double as the catalog of each technique's failure mode.

> **Disclaimer**
> Think carefully before applying these techniques, like there is no tomorrow.
>
> Branches, `if`s and decisions are all the same thing. This is not "never write a simple `if` again
> and use reflection all the time". Some problems justify different techniques, some don't. Always ask
> whether the cost and complexity of the solution is worth it - there is no right or wrong, only
> tradeoffs.
>
> [The Anti-IF Campaign](https://francescocirillo.com/products/the-anti-if-campaign)

## Why this exists

There are many ways to handle a decision, from the simple `if` in the code to a generic service with
an admin UI backed by a database. And there are many ways to *express* a decision, rooted in
different schools of thought:

| School             | Style                                                    | Where the decision lives |
| ------------------ | -------------------------------------------------------- | ----------------------- |
| **Procedural**     | C-style, steps in order                                   | In the method body       |
| **Object Oriented**| DDD, pure objects, [Elegant Objects](https://www.yegor256.com/) | In the objects      |
| **Generic**        | generic data structures, dynamic techniques              | In data / metadata      |

The tradeoffs run from **compile time and type systems** to **runtime and dynamic programming**. Some
of that choice is taste and preference. IMHO the type system and the compiler are worth more,
because they reduce the amount of test you need to do and shorten the feedback loop.

Every technique below moves a decision somewhere specific. Knowing *where* it moved, and *what you
gave up* to move it, is the point of the exercise.

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

Each demo is self-contained with its own small domain, so the comparison is about the *technique*,
not about the problem. The link column is the file to read.

### Basic Branches

| # | Technique | PROS | CONS | Demo |
| - | --------- | ---- | ---- | ---- |
| 1 | **IFs** | Fast, simple to do | Harder to understand, more verbose | [`IfExample`](src/main/java/com/example/ifalternatives/basic/IfExample.java) |
| 2 | **Switch** | Easier to understand, more compact than ifs | Requires ifs in some scenarios | [`SwitchExample`](src/main/java/com/example/ifalternatives/basic/SwitchExample.java) |
| 3 | **SCM branches** (git/svn/hg) | Might be the only solution (lack of BC) | Harder to maintain, a bit obscure | [`ScmBranchExample`](src/main/java/com/example/ifalternatives/basic/ScmBranchExample.java) |

`IfExample` is the baseline: one method, one branch per business rule. Adding a zone means editing
that method, and reading the behavior means reading all of it.

`SwitchExample` shows why technique 2 does not replace technique 1. The severity switch is exhaustive
and needs no `default`, but `slaBand()` has to stay a chain of ifs: **a switch dispatches on a single
value, and `minutes <= 15` is not a switch case.**

`ScmBranchExample` is the one you cannot express in Java at all. On a real project you build `V1` on
`main` and `V2` on `feature/fix-coupon-order`, one artifact per branch, and the merge is where it
hurts. The demo builds the JVM equivalent - two engines plus a `-D` flag - because that is the only
way to have both versions compiled in one process. The real workflow:

```bash
git switch -c feature/fix-coupon-order
# ... edit, commit
mvn compile exec:java          # main:     total=274.56
mvn compile exec:java -Difalternatives.branch=feature/fix-coupon-order   # total=247.10
git switch main && git merge feature/fix-coupon-order    # <- the cost
```

### Generic Options

| # | Technique | PROS | CONS | Demo |
| - | --------- | ---- | ---- | ---- |
| 4 | **Enums** | Concise, type system | Breaks type system (runtime eval) - sucks with serialization, DB loads | [`EnumExample`](src/main/java/com/example/ifalternatives/generic/EnumExample.java) |
| 5 | **Maps** | Elegant, compact, concise | Slower, breaks type system (runtime eval) | [`MapExample`](src/main/java/com/example/ifalternatives/generic/MapExample.java) |
| 6 | **Properties** | Generic code | Depends on disk, doesn't work well for embedded jars | [`PropertiesExample`](src/main/java/com/example/ifalternatives/generic/PropertiesExample.java) |
| 7 | **Reflection** | Generic | Slower, obscure, complex | [`ReflectionExample`](src/main/java/com/example/ifalternatives/generic/ReflectionExample.java) |
| 8 | **Annotations** | Declarative, generic - has ifs but the code won't grow | More complexity - cache, runtime only | [`AnnotationExample`](src/main/java/com/example/ifalternatives/generic/AnnotationExample.java) |
| 9 | **Math** | Fast, CPU effective, no ifs, less code | Can get less obvious if complex | [`MathExample`](src/main/java/com/example/ifalternatives/generic/MathExample.java) |

**4. Enums** - each constant carries its own rule through an abstract method per constant:

```java
enum Payment {
    CARD { BigDecimal fee() { return new BigDecimal("0.00"); } BigDecimal maxAmount() { return new BigDecimal("5000.00"); } },
    PAYPAL { BigDecimal fee() { return new BigDecimal("2.90"); } BigDecimal maxAmount() { return new BigDecimal("2000.00"); } };
    abstract BigDecimal fee();
    abstract BigDecimal maxAmount();
}
```

The con is not theoretical and it is not about the *code* - it is about the data. `valueOf(name)` is
the persistence format, so a constant renamed from `DEBIT_CARD` to `CARD` makes every row already in
the database fail at runtime. The demo loads a stored `DEBIT_CARD` row and lets it explode.

**5. Maps** - the decision is a lookup, and the miss is the interesting part:

```java
static Optional<BigDecimal> discountFor(String couponCode) {
    if (couponCode == null) { return Optional.empty(); }
    return Optional.ofNullable(DISCOUNTS.get(couponCode.trim().toUpperCase()));
}
```

`"WELCOME1O"` (letter O) is a perfectly valid key that matches nothing, and the compiler is silent.
The key type could be an enum - then you are back to technique 4, with a map's dispatch cost.

**6. Properties** - the rules move out of the code, which is the point, and into a file, which is
the cost. A resource inside a jar is immutable, so a library that ships `limits.properties` cannot be
tuned by its consumers; the only escape hatch is an external file. And a misspelled key is not an
error, it is a `null` and a `BigDecimal` constructor that throws three frames later.

**7. Reflection** - the branch is a method name in a `String`:

```java
static BigDecimal apply(String policyName, BigDecimal total) throws ReflectiveOperationException {
    return (BigDecimal) resolve(policyName).invoke(null, total);
}
```

The demo runs a config containing `full-discount` - the name a method has *after* a kebab-case
refactor. It compiles, it deploys, and it throws `NoSuchMethodException` on the first call. The
`CACHE` is not premature optimization, it is the price of admission.

**8. Annotations** - the rule is declared on a class and discovered once into a registry, so the
dispatch code stops growing. Two cons show up in the demo: a class that forgets the annotation is
skipped *silently* (no compiler can catch a runtime-only mistake), and the scan needs a cache. The
variant worth knowing is an **annotation processor**, which does the same job at build time when the
compiler can still fail on a bad rule.

**9. Math** - no ifs at all. `Math.max(0, Math.min(3, points / 1000 - 1))` is a clamp. The moment it
stops being obvious it stops being reviewable: `surchargeFor` indexes an array by
`Integer.numberOfTrailingZeros(mask)`, and a new flag with no table entry fails with an
`ArrayIndexOutOfBoundsException` instead of a compile error.

### Elegant Options

Loose some performance.

| # | Technique | PROS | CONS | Demo |
| - | --------- | ---- | ---- | ---- |
| 10 | **IF Objects** | Concise, good code readability | Uses more memory (more objects) | [`IfObjectExample`](src/main/java/com/example/ifalternatives/elegant/IfObjectExample.java) |
| 11 | **Functional** (predicates, suppliers, functions) | Greater reuse: granular functions, functional style | More complex, still has ifs | [`FunctionalExample`](src/main/java/com/example/ifalternatives/elegant/FunctionalExample.java) |
| 12 | **Composable Decorators** (Elegant Objects) | Elegant pure OOP style | More memory usage, a bit more complex | [`DecoratorExample`](src/main/java/com/example/ifalternatives/elegant/DecoratorExample.java) |

**10. IF Objects** - every condition becomes a named object and the decision becomes a list:

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

The `if` is still there - it just is not inline anymore. What you gained is real: the conditions are
a readable table, each one is unit testable alone, and `priorityOf` reuses the same five objects for a
second decision. What you spent is one object per condition per call.

**11. Functional** - the same shape built from `Predicate`/`Function`/`Supplier`, which adds lazy
evaluation (`orElseGet` only builds the fallback when nothing matched) and composition
(`TAX.andThen(ROUND_DOWN)`). The con is that the ifs moved into the JDK: `Stream.filter`,
`Optional.orElse` and `Function.andThen` are all branches you did not write, and a stream plus a
lambda per rule is slower than the `if` it replaced.

**12. Composable Decorators** - each rule wraps the previous one, and the assembly order *is* the
decision:

```java
new Discount(new ShippingFee(subtotal, FEE), DISCOUNT)   // 210.33
new ShippingFee(new Discount(subtotal, DISCOUNT), FEE)   // 210.82
```

Same cart, same rules, different total - because the fee is additive and the discount multiplies. The
type system cannot see that difference; only the reader of the composition can.

### Polymorphism + Type System

Use the language and proper OO design.

| # | Technique | PROS | CONS | Demo |
| - | --------- | ---- | ---- | ---- |
| 13 | **Reflection and InstanceOf** | More elegant | A bit more complex, breaks the type system - `instanceOf` is resolved at runtime | [`InstanceOfExample`](src/main/java/com/example/ifalternatives/polymorphism/InstanceOfExample.java) |
| 14 | **Type System + Polymorphism** | Best solution, simple, OO, fast, elegant | Has the ifs (factory - no way to avoid it) | [`PolymorphismExample`](src/main/java/com/example/ifalternatives/polymorphism/PolymorphismExample.java) |

**13. Reflection and InstanceOf** - dispatch on the runtime type with `instanceof` patterns, then the
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

The con is the `default`. The hierarchy in this demo is deliberately **not** sealed, so
`InstanceOfExample.Unknown` exists, compiles, deploys, and quietly becomes `"unsupported"` in both
dispatch styles. Nothing failed at build time.

**14. Type System + Polymorphism** - the best row in the table. Each subtype carries its own rule, so
the consumers have no branch at all, and `sealed` makes the set of subtypes a closed universe:

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

Add a `Drone` record and every non-exhaustive switch in the codebase stops compiling - that is the
whole difference from technique 13. The one branch you cannot avoid is the factory, because the
outside world is a string in the database and not a type:

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

Keep it in one small, obvious place, fail fast on the unknown, and every other decision lives with the
data it describes.

## Performance freedom (the Elegant Options)

Techniques 10-12 deliberately trade CPU and memory for readability, and that is a legitimate choice -
but it should be a choice, not an accident.

| You spend            | On                                            | You buy                       |
| -------------------- | --------------------------------------------- | ----------------------------- |
| One object per rule  | Heap, allocated per call in 10 and 11         | A decision table you can read |
| `Stream` + lambdas   | Allocation per stage, megamorphic call sites | Composable, testable pieces   |
| Object per wrapper   | One more indirection per decorator            | Order-independent assembly    |
| Reflection / runtime | Class metadata scan, `Method.invoke`          | A rule engine in a few lines  |

Reach for these when the decision logic is the thing you keep changing and the path is not the hot
path. Keep technique 1 or 9 when it is 30 million requests a second and the branch is the code.

## Tradeoffs checklist

Before choosing, walk these. The list is deliberately the uncomfortable half of the decision.

**Null and corner cases**
- Ignore it, add more ifs, push it to the consumer, or fix it in a decorator?
- Empty object / `Optional` / monad, or plain `null`?
- Can you recover from it, and what does recovery cost?

**Fail fast vs fail safe**
- Crash or panic?
- Fail fast (throw, stop, alert) vs fail safe (default, degrade, retry)?
- Is an exception an *error* or an *exception*? Checked or unchecked?
- One exception type for everything, or several? Which ones, and why?

**What are you going to do with it?**
- Rate of change: daily, weekly, monthly, quarterly, yearly?
- Who changes it: a developer, or ops, or a customer through an admin UI?
- Why does it change - and can the change be additive?

**Controlled vs growing complexity**
- Does the code grow as you gain conditions?
- How many places do you need to touch to add one?

**Optimizations**
- RPC or batch?
- Cache, eager or lazy, on demand?
- Does this decision belong on the client, the server, or the BFF?

**School of thought**
- OOP, FP, generic, compile-time vs dynamic?
- What does the team prefer, and why?
- Is the team preference about the language or about the last project that hurt them?

A useful default while you are still deciding: **compile-time over runtime, type system over string
keys, fail fast over silent defaults** - unless one of the questions above answers back.

## Tests

One test class per category, one nested class per technique, 51 tests total. They assert the decision
each technique makes **and** the failure mode its PROS/CONS claim:

| Technique | The edge case under test |
| --------- | ------------------------ |
| Ifs       | unknown zone fails fast with `IllegalArgumentException` |
| Switch    | `slaBand` ranges still need an if |
| SCM       | branch flag selects the engine; unknown branch fails fast |
| Enums     | a constant renamed in code breaks the persisted row |
| Maps      | typo key and `null` are both silent runtime misses |
| Properties| missing resource returns empty, not null; an override layered on the defaults keeps the untouched keys |
| Reflection| renamed method throws `NoSuchMethodException`; wrong argument throws `IllegalArgumentException` |
| Annotations | the unannotated class is skipped without a warning |
| Math      | unmapped flag bit throws `ArrayIndexOutOfBoundsException` |
| IF objects| earlier conditions outrank later ones |
| Functional| `frozen` outranks overdrawn, dormant and vip |
| Decorators| assembly order changes the total |
| InstanceOf| an unhandled subtype falls through `default` |
| Polymorphism | unknown carrier fails fast; customs only above the threshold |

## Links

- [The Anti-IF Campaign](https://francescocirillo.com/products/the-anti-if-campaign)
- Related projects in this repo: [`../patternmatching`](../patternmatching) (switch/record patterns),
  [`../sealedclasses`](../sealedclasses) (sealed hierarchies), [`../functional`](../functional)
  (functional style), [`../exceptions`](../exceptions) (error policy)
