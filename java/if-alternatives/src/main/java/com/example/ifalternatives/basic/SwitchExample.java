package com.example.ifalternatives.basic;

import java.util.List;

/**
 * Technique 2 - Switch: the classic switch statement vs the switch expression.
 *
 * <p>PROS: more compact than ifs, the cases read as a table, the compiler can require
 * exhaustiveness when no default is present.
 *
 * <p>CONS: a switch dispatches on a single value. Ranges ({@code minutes <= 15}) and
 * arbitrary predicates are not expressible, so an if is still required - see
 * {@link #slaBand(int)}.
 */
public class SwitchExample {

    private static final List<Ticket> TICKETS = List.of(
            new Ticket(Severity.CRITICAL, CustomerTier.FREE),
            new Ticket(Severity.HIGH, CustomerTier.PREMIUM),
            new Ticket(Severity.MEDIUM, CustomerTier.PREMIUM),
            new Ticket(Severity.MEDIUM, CustomerTier.FREE),
            new Ticket(Severity.LOW, CustomerTier.STANDARD));

    public static void demo() {
        System.out.println("Switch expression, exhaustive without default:");
        for (Ticket ticket : TICKETS) {
            int minutes = responseTimeMinutes(ticket);
            System.out.printf("  %-28s -> %5d min  (%s)%n", ticket, minutes, slaBand(minutes));
        }
        System.out.println("  slaBand() is a plain if chain: switch cannot express ranges");
    }

    /** The nested switch is the price of a decision that depends on two values. */
    static int responseTimeMinutes(Ticket ticket) {
        return switch (ticket.severity()) {
            case CRITICAL -> 15;
            case HIGH -> 60;
            case MEDIUM -> switch (ticket.tier()) {
                case PREMIUM -> 120;
                case STANDARD -> 240;
                case FREE -> 480;
            };
            case LOW -> 1440;
        };
    }

    /** The remaining if: numeric ranges are not a switch over an enum or a constant. */
    static String slaBand(int minutes) {
        if (minutes <= 15) {
            return "GOLD";
        }
        if (minutes <= 60) {
            return "SILVER";
        }
        if (minutes <= 240) {
            return "BRONZE";
        }
        return "NONE";
    }

    enum Severity {
        CRITICAL,
        HIGH,
        MEDIUM,
        LOW
    }

    enum CustomerTier {
        PREMIUM,
        STANDARD,
        FREE
    }

    record Ticket(Severity severity, CustomerTier tier) {
    }
}
