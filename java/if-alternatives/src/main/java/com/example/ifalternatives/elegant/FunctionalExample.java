package com.example.ifalternatives.elegant;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;
import java.util.stream.Stream;

/**
 * Technique 11 - Functional: predicates, functions and suppliers composed into a pipeline.
 *
 * <p>PROS: greater reuse - the granular pieces are testable alone and composable into different
 * pipelines, which is the closest thing here to a rule engine written in a few lines.
 *
 * <p>CONS: more complex, and the ifs are still there - they just moved inside {@code Optional},
 * {@code Stream} and {@code Function.andThen}. The pro also has a performance cost: a stream plus
 * a lambda per rule is slower than the if it replaces.
 */
public class FunctionalExample {

    private static final Predicate<Account> FROZEN = Account::frozen;
    private static final Predicate<Account> OVERDRAFTED = account -> account.balance().signum() < 0;
    private static final Predicate<Account> DORMANT = account -> account.monthsIdle() >= 12;
    private static final Predicate<Account> VIP = account -> account.tier() == Tier.VIP;

    /** Granular functions: each one is a testable unit, the pipeline is just composition. */
    private static final Function<BigDecimal, BigDecimal> TAX =
            amount -> amount.multiply(new BigDecimal("0.20")).setScale(2, RoundingMode.HALF_UP);
    private static final Function<BigDecimal, BigDecimal> ROUND_DOWN =
            amount -> amount.setScale(0, RoundingMode.DOWN);

    private static final List<Account> ACCOUNTS = List.of(
            new Account(Tier.STANDARD, new BigDecimal("120.50"), 1, false),
            new Account(Tier.VIP, new BigDecimal("980.00"), 0, false),
            new Account(Tier.STANDARD, new BigDecimal("-40.00"), 3, false),
            new Account(Tier.STANDARD, new BigDecimal("12.00"), 18, true),
            new Account(Tier.VIP, new BigDecimal("980.00"), 0, true));

    public static void demo() {
        System.out.println("settle() is a pipeline of predicates with a lazy fallback:");
        for (Account account : ACCOUNTS) {
            System.out.printf("  %-52s -> %s%n", account, settle(account));
        }

        System.out.println("  composition: TAX.andThen(ROUND_DOWN).apply(12.50) = "
                + TAX.andThen(ROUND_DOWN).apply(new BigDecimal("12.50")));

        System.out.println("  the fallback is a Supplier, so it is built only when nothing matched:");
        Supplier<String> expensiveFallback = () -> "manual review " + BigDecimal.ZERO.toPlainString();
        System.out.println("    orElseGet on a match   -> "
                + Optional.of("frozen").orElseGet(expensiveFallback));
        System.out.println("    orElseGet on no match  -> "
                + Optional.empty().orElseGet(expensiveFallback));
    }

    /** The decision: the first matching predicate wins, the rest are never evaluated. */
    static String settle(Account account) {
        return firstMatch(account,
                new Rule("frozen", FROZEN),
                new Rule("overdrawn", OVERDRAFTED),
                new Rule("dormant", DORMANT),
                new Rule("vip", VIP))
                .map(Rule::name)
                .orElseGet(() -> "standard");
    }

    /** {@code Optional.orElse} and {@code Stream.findFirst} are ifs you did not write. */
    private static Optional<Rule> firstMatch(Account account, Rule... rules) {
        return Stream.of(rules)
                .filter(rule -> rule.condition().test(account))
                .findFirst();
    }

    record Rule(String name, Predicate<Account> condition) {
    }

    enum Tier {
        STANDARD,
        VIP
    }

    record Account(Tier tier, BigDecimal balance, int monthsIdle, boolean frozen) {
    }
}
