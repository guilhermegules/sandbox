package com.example.ifalternatives.generic;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Technique 8 - Annotations: declarative metadata, discovered reflectively into a registry.
 *
 * <p>PROS: declarative and generic. The rule is declared on the class, so adding a rule adds a class
 * and the dispatch code does not grow - the ifs are gone, the registry is built once.
 *
 * <p>CONS: more complexity. You need a scan plus a cache, and a class that forgot the annotation is
 * skipped silently. Also runtime-only: an annotation processor (APT) does the same work at build
 * time, when the compiler can still fail on a bad rule - that is the variant worth knowing.
 */
public class AnnotationExample {

    private static final List<Class<?>> CANDIDATES = List.of(
            VipDiscount.class,
            ClearanceDiscount.class,
            SeasonalDiscount.class,
            NotARule.class);

    /** The cache the cons talk about: scanning on every request would be absurd. */
    private static final Map<String, DiscountPolicy> REGISTRY = scan(CANDIDATES);

    private static final List<String> COUPONS = List.of("VIP20", "CLEAR50", "SUMMER15", "VIP99", "NO-TAG");

    public static void demo() {
        System.out.println("registry built by scanning annotated classes:");
        for (Class<?> candidate : CANDIDATES) {
            DiscountRule rule = candidate.getAnnotation(DiscountRule.class);
            if (rule == null) {
                System.out.printf("  %-19s -> no @DiscountRule, skipped without a warning%n",
                        candidate.getSimpleName());
                continue;
            }
            System.out.printf("  %-19s -> @DiscountRule(code=%-9s percent=%2d)%n",
                    candidate.getSimpleName(), rule.code(), rule.percent());
        }
        System.out.printf("  scanned %d classes, %d qualified%n", CANDIDATES.size(), REGISTRY.size());

        System.out.println("  lookups:");
        BigDecimal total = new BigDecimal("200.00");
        for (String coupon : COUPONS) {
            DiscountPolicy policy = REGISTRY.get(coupon);
            System.out.printf("  %-9s -> %s%n", coupon,
                    policy == null ? "no rule matched -> full price " + total.toPlainString()
                            : policy.applyTo(total).toPlainString());
        }
    }

    static Map<String, DiscountPolicy> scan(List<Class<?>> candidates) {
        Map<String, DiscountPolicy> registry = new LinkedHashMap<>();
        for (Class<?> candidate : candidates) {
            DiscountRule rule = candidate.getAnnotation(DiscountRule.class);
            if (rule == null) {
                continue;
            }
            registry.put(rule.code(), new AnnotatedPolicy(rule.percent()));
        }
        return Map.copyOf(registry);
    }

    @Retention(RetentionPolicy.RUNTIME)
    @Target(ElementType.TYPE)
    @interface DiscountRule {
        String code();

        int percent();
    }

    interface DiscountPolicy {
        BigDecimal applyTo(BigDecimal total);
    }

    /** The rule as the registry stores it: the annotation supplies the data, nothing else. */
    record AnnotatedPolicy(int percent) implements DiscountPolicy {
        @Override
        public BigDecimal applyTo(BigDecimal total) {
            return total.multiply(new BigDecimal(percent))
                    .divide(new BigDecimal("100"), 2, RoundingMode.HALF_UP);
        }
    }

    @DiscountRule(code = "VIP20", percent = 20)
    static class VipDiscount {
    }

    @DiscountRule(code = "CLEAR50", percent = 50)
    static class ClearanceDiscount {
    }

    @DiscountRule(code = "SUMMER15", percent = 15)
    static class SeasonalDiscount {
    }

    /** Missed the annotation: a runtime-only mistake that no compiler can report. */
    static class NotARule {
    }
}
