package com.example.ifalternatives.generic;

import java.math.BigDecimal;
import java.util.List;

/**
 * Technique 4 - Enums: each constant carries its own behavior (an abstract method per constant).
 *
 * <p>PROS: concise, the type system knows the whole set, the compiler finds every missing case.
 *
 * <p>CONS: the decision is still resolved at runtime by {@code valueOf(name)}, and names are the
 * persistence format - reorder the constants or rename one and the rows already in the database
 * silently point at another payment method. {@link #fromPersistedName(String)} is the trap.
 */
public class EnumExample {

    /** Rows as they come out of the database: only the name was stored. */
    private static final List<PaymentMethodRow> PERSISTED_ROWS = List.of(
            new PaymentMethodRow("PAYPAL", new BigDecimal("250.00")),
            new PaymentMethodRow("CARD", new BigDecimal("9000.00")),
            new PaymentMethodRow("DEBIT_CARD", new BigDecimal("40.00")));

    public static void demo() {
        System.out.println("payment method decided by enum constant, not by an if:");
        for (Payment payment : Payment.values()) {
            System.out.printf("  %-7s fee=%-6s limit=%s%n",
                    payment.name(), payment.fee(), payment.maxAmount());
        }

        System.out.println("  now load the rows back from the database:");
        for (PaymentMethodRow row : PERSISTED_ROWS) {
            String outcome;
            try {
                Authorization authorization = PaymentMethodRow.authorize(row);
                outcome = authorization.status() + " fee=" + authorization.fee();
            } catch (IllegalArgumentException e) {
                outcome = e.getClass().getSimpleName() + ": " + e.getMessage();
            }
            System.out.printf("  %-12s %-8s -> %s%n", row.methodName(), row.amount(), outcome);
        }
        System.out.println("  'DEBIT_CARD' was renamed to CARD: the row still says DEBIT_CARD and valueOf fails");
    }

    /** The con, in one method: the name is the wire format, so reordering constants breaks data. */
    static Payment fromPersistedName(String storedName) {
        return Payment.valueOf(storedName);
    }

    enum Payment {
        CARD {
            @Override
            BigDecimal fee() {
                return new BigDecimal("0.00");
            }

            @Override
            BigDecimal maxAmount() {
                return new BigDecimal("5000.00");
            }
        },
        PAYPAL {
            @Override
            BigDecimal fee() {
                return new BigDecimal("2.90");
            }

            @Override
            BigDecimal maxAmount() {
                return new BigDecimal("2000.00");
            }
        },
        BOLETO {
            @Override
            BigDecimal fee() {
                return new BigDecimal("0.00");
            }

            @Override
            BigDecimal maxAmount() {
                return new BigDecimal("800.00");
            }
        };

        abstract BigDecimal fee();

        abstract BigDecimal maxAmount();
    }

    record PaymentMethodRow(String methodName, BigDecimal amount) {

        static Authorization authorize(PaymentMethodRow row) {
            Payment payment = fromPersistedName(row.methodName());
            if (row.amount().compareTo(payment.maxAmount()) > 0) {
                return new Authorization("DECLINED", payment, payment.fee());
            }
            return new Authorization("APPROVED", payment, payment.fee());
        }
    }

    record Authorization(String status, Payment payment, BigDecimal fee) {
    }
}
