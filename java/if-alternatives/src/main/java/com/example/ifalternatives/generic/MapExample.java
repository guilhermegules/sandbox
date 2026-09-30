package com.example.ifalternatives.generic;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Technique 5 - Maps: a {@code Map<Key, Decision>} replaces the branch entirely.
 *
 * <p>PROS: elegant, compact, concise - adding a rule is adding an entry.
 *
 * <p>CONS: slower than a switch (hash lookup, no jump table), and the type system is gone: the key
 * and the value are just objects, so a typo in a key string is a runtime miss, not a compile error.
 */
public class MapExample {

    private static final Map<String, BigDecimal> DISCOUNTS = new LinkedHashMap<>(Map.of(
            "WELCOME10", new BigDecimal("0.10"),
            "BLACKFRIDAY25", new BigDecimal("0.25"),
            "STAFF100", BigDecimal.ZERO));

    /**
     * {@code Arrays.asList} and not {@code List.of} on purpose: {@code List.of} rejects nulls at
     * construction, {@code Arrays.asList} lets a null coupon reach {@link #discountFor(String)} -
     * which is exactly the corner case this technique has to decide about.
     */
    private static final List<String> COUPONS =
            Arrays.asList("WELCOME10", "BLACKFRIDAY25", "STAFF100", "TYPO-WELCOME10", null);

    public static void demo() {
        System.out.println("coupon decided by a map lookup, no if in sight:");
        for (String coupon : COUPONS) {
            System.out.printf("  %-16s -> %s%n",
                    coupon == null ? "null" : coupon,
                    discountFor(coupon).map(v -> v + " off").orElse("no rule matched -> full price"));
        }
        System.out.println("  the misses are the point: no key is validated at compile time");
    }

    /**
     * CONS in one signature: the key is a {@code String}, so {@code "WELCOME1O"} (letter O) and
     * {@code "WELCOME10"} (zero) are both perfectly valid keys that match nothing.
     */
    static Optional<BigDecimal> discountFor(String couponCode) {
        if (couponCode == null) {
            return Optional.empty();
        }
        return Optional.ofNullable(DISCOUNTS.get(couponCode.trim().toUpperCase()));
    }
}
