package com.example.ifalternatives.polymorphism;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

/**
 * Technique 14 - Type System + Polymorphism: the "best solution" column of the table.
 *
 * <p>PROS: simple, OO, fast, elegant. The decision disappears from the consumers because each
 * subtype carries its own rule, and {@code sealed} makes the set of subtypes a closed universe:
 * adding {@code Drone} makes every non-exhaustive switch in the codebase fail to compile.
 *
 * <p>CONS: the factory still has to translate the outside world (a carrier code from a database)
 * into a type, so there is one branch left - there is no way to avoid it, only to keep it in one
 * small, obvious place.
 */
public class PolymorphismExample {

    private static final List<Parcel> PARCELS = List.of(
            new Parcel(new BigDecimal("0.8"), new BigDecimal("40.00"), false),
            new Parcel(new BigDecimal("12.0"), new BigDecimal("180.00"), true),
            new Parcel(new BigDecimal("0.4"), new BigDecimal("1200.00"), false));

    private static final List<String> CARRIERS = List.of("LOCAL", "NATIONAL", "INTERNATIONAL", "DRONE");

    public static void demo() {
        System.out.println("each subtype quotes itself, so no consumer holds a branch:");
        for (Parcel parcel : PARCELS) {
            for (String carrier : CARRIERS.subList(0, 3)) {
                Shipping shipping = of(carrier);
                Quote quote = shipping.quote(parcel);
                System.out.printf("  %-8s %-34s -> %8.2f EUR in %d day(s)%n",
                        carrier, parcel, quote.amount(), quote.days());
            }
        }

        System.out.println("  the one branch that cannot be avoided is the factory:");
        for (String carrier : CARRIERS) {
            try {
                System.out.printf("  of(%-14s) -> %s%n", carrier, of(carrier));
            } catch (IllegalArgumentException e) {
                System.out.printf("  of(%-14s) -> %s: %s%n", carrier, e.getClass().getSimpleName(),
                        e.getMessage());
            }
        }

        System.out.println("  consumers switch over the sealed set with no default:");
        for (String carrier : CARRIERS.subList(0, 3)) {
            System.out.printf("  %-13s -> %s%n", carrier, slaReport(of(carrier)));
        }
    }

    /** The factory: untyped string in, closed set of types out. One switch, no other branch anywhere. */
    static Shipping of(String carrier) {
        return switch (carrier) {
            case "LOCAL" -> new Local();
            case "NATIONAL" -> new National();
            case "INTERNATIONAL" -> new International();
            default -> throw new IllegalArgumentException("Unknown carrier: " + carrier);
        };
    }

    /** Exhaustive on purpose: a new {@code Drone} record breaks this method at compile time. */
    static String slaReport(Shipping shipping) {
        return switch (shipping) {
            case Local local -> local.carrier() + " handles " + local.maxWeightKg() + "kg, "
                    + local.slaDays() + " day(s)";
            case National national -> national.carrier() + " guarantees " + national.slaDays()
                    + " day(s) inside the country";
            case International international -> international.carrier() + " takes "
                    + international.slaDays() + " day(s) and adds customs above EUR 500";
        };
    }

    sealed interface Shipping {

        BigDecimal base();

        BigDecimal perKg();

        int slaDays();

        String carrier();

        default Quote quote(Parcel parcel) {
            return new Quote(baseRate(this, parcel), slaDays());
        }
    }

    record Local() implements Shipping {
        @Override
        public BigDecimal base() {
            return new BigDecimal("4.90");
        }

        @Override
        public BigDecimal perKg() {
            return new BigDecimal("0.80");
        }

        @Override
        public int slaDays() {
            return 1;
        }

        @Override
        public String carrier() {
            return "LocalPost";
        }

        BigDecimal maxWeightKg() {
            return new BigDecimal("20");
        }
    }

    record National() implements Shipping {
        @Override
        public BigDecimal base() {
            return new BigDecimal("12.50");
        }

        @Override
        public BigDecimal perKg() {
            return new BigDecimal("1.20");
        }

        @Override
        public int slaDays() {
            return 3;
        }

        @Override
        public String carrier() {
            return "NationalExpress";
        }
    }

    record International() implements Shipping {
        @Override
        public BigDecimal base() {
            return new BigDecimal("39.90");
        }

        @Override
        public BigDecimal perKg() {
            return new BigDecimal("4.50");
        }

        @Override
        public int slaDays() {
            return 8;
        }

        @Override
        public String carrier() {
            return "GlobalAir";
        }

        @Override
        public Quote quote(Parcel parcel) {
            BigDecimal amount = baseRate(this, parcel);
            if (parcel.declaredValue().compareTo(new BigDecimal("500")) > 0) {
                amount = money(amount.add(new BigDecimal("12.00")));
            }
            return new Quote(amount, slaDays());
        }
    }

    /** Shared by the default quote and the one subtype that overrides it. */
    private static BigDecimal baseRate(Shipping shipping, Parcel parcel) {
        return money(shipping.base().add(shipping.perKg().multiply(parcel.weightKg())));
    }

    record Parcel(BigDecimal weightKg, BigDecimal declaredValue, boolean insured) {
    }

    record Quote(BigDecimal amount, int days) {
    }

    private static BigDecimal money(BigDecimal value) {
        return value.setScale(2, RoundingMode.HALF_UP);
    }
}
