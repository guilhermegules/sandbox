package com.example.ifalternatives.basic;

import java.util.List;

/**
 * Technique 1 - IFs: the if/else-if chain.
 *
 * <p>PROS: fastest, nothing to learn, always available.
 *
 * <p>CONS: every new rule edits the same method, the nesting grows, and reading the
 * whole behavior requires reading every line (no summary at the call site).
 */
public class IfExample {

    private static final List<Shipment> SHIPMENTS = List.of(
            new Shipment("DOMESTIC", 0.8, false),
            new Shipment("DOMESTIC", 12.0, false),
            new Shipment("DOMESTIC", 12.0, true),
            new Shipment("CONTINENTAL", 3.5, false),
            new Shipment("INTERNATIONAL", 0.4, true),
            new Shipment("MARS", 0.4, false));

    public static void demo() {
        System.out.println("One method, one if per business rule:");
        for (Shipment shipment : SHIPMENTS) {
            String cost;
            try {
                cost = format(shippingCost(shipment));
            } catch (IllegalArgumentException e) {
                cost = e.getClass().getSimpleName() + ": " + e.getMessage();
            }
            System.out.printf("  %-36s -> %s%n", shipment, cost);
        }
        System.out.println("  rules live in shippingCost(); adding a zone means editing it too");
    }

    static double shippingCost(Shipment shipment) {
        if ("DOMESTIC".equals(shipment.zone())) {
            if (shipment.express()) {
                return round(9.90 + 1.20 * shipment.weightKg() * 2);
            }
            if (shipment.weightKg() >= 10) {
                return 0.0;
            }
            return round(9.90 + 1.20 * shipment.weightKg());
        }
        if ("CONTINENTAL".equals(shipment.zone())) {
            if (shipment.express()) {
                return round(29.90 + 3.10 * shipment.weightKg() * 2);
            }
            return round(29.90 + 3.10 * shipment.weightKg());
        }
        if ("INTERNATIONAL".equals(shipment.zone())) {
            if (shipment.express()) {
                return round(59.90 + 6.40 * shipment.weightKg() * 2);
            }
            return round(59.90 + 6.40 * shipment.weightKg());
        }
        throw new IllegalArgumentException("Unknown zone: " + shipment.zone());
    }

    private static double round(double value) {
        return Math.round(value * 100) / 100.0;
    }

    private static String format(double value) {
        return String.format("EUR %.2f", value);
    }

    record Shipment(String zone, double weightKg, boolean express) {
        @Override
        public String toString() {
            return zone + " " + weightKg + "kg" + (express ? " express" : "");
        }
    }
}
