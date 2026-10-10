package com.example.ifalternatives.generic;

import java.util.List;

/**
 * Technique 9 - Math: the branch disappears into arithmetic and bit operations.
 *
 * <p>PROS: fast and CPU effective, no ifs, the least code of all fourteen techniques.
 *
 * <p>CONS: as soon as the expression stops being obvious it stops being reviewable, and mistakes
 * are silent or blow up as an array index - see {@link #surchargeFor(int)} with an unmapped flag.
 */
public class MathExample {

    private static final int READ = 1 << 0;
    private static final int WRITE = 1 << 1;
    private static final int DELETE = 1 << 2;
    private static final int EXPORT = 1 << 3;

    private static final int[] SURCHARGE_BY_LOWEST_BIT = {0, 5, 15, 40};

    private static final List<Mask> MASKS = List.of(
            new Mask(READ, "read only"),
            new Mask(READ | WRITE, "read+write"),
            new Mask(READ | WRITE | DELETE | EXPORT, "everything"),
            new Mask(1 << 7, "flag 7 (never mapped)"));

    private static final List<Integer> POINT_BALANCES = List.of(0, 1200, 2200, 3200, 4200);

    public static void demo() {
        System.out.println("permissions decided with a bit test, no if:");
        for (Mask mask : MASKS) {
            System.out.printf("  %-20s (mask=%-3d) read=%-5s write=%-5s delete=%-5s export=%-5s%n",
                    mask.label(), mask.value(),
                    can(mask.value(), READ), can(mask.value(), WRITE),
                    can(mask.value(), DELETE), can(mask.value(), EXPORT));
        }

        System.out.println("  loyalty tier from a branchless clamp:");
        for (int points : POINT_BALANCES) {
            System.out.printf("  %6d points -> tier %d%n", points, tierFor(points));
        }

        System.out.println("  surcharge from the lowest set bit - the cons start here:");
        for (Mask mask : MASKS) {
            String outcome;
            try {
                outcome = surchargeFor(mask.value()) + "%";
            } catch (ArrayIndexOutOfBoundsException e) {
                outcome = e.getClass().getSimpleName() + ": no surcharge mapped for flag bit "
                        + Integer.numberOfTrailingZeros(mask.value());
            }
            System.out.printf("  %-20s -> %s%n", mask.label(), outcome);
        }
    }

    static boolean can(int mask, int permission) {
        return (mask & permission) == permission;
    }

    /** A clamp is a clamp is a clamp: two Math calls replace three comparisons. */
    static int tierFor(int points) {
        return Math.max(0, Math.min(3, points / 1000 - 1));
    }

    /**
     * Clever, fast, and unreadable: a reader has to know that {@code numberOfTrailingZeros} means
     * "lowest set bit" to see what this does. If a new flag is added without a new table entry, the
     * failure is an index out of bounds instead of a compile error.
     */
    static int surchargeFor(int mask) {
        return SURCHARGE_BY_LOWEST_BIT[Integer.numberOfTrailingZeros(mask)];
    }

    record Mask(int value, String label) {
    }
}
