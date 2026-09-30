package com.example.ifalternatives.basic;

import static com.example.ifalternatives.basic.ScmBranchExample.BRANCH_PROPERTY;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.example.ifalternatives.basic.ScmBranchExample.V1Pricing;
import com.example.ifalternatives.basic.ScmBranchExample.V2Pricing;
import com.example.ifalternatives.basic.SwitchExample.CustomerTier;
import com.example.ifalternatives.basic.SwitchExample.Severity;
import com.example.ifalternatives.basic.SwitchExample.Ticket;
import java.math.BigDecimal;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class BasicBranchesTest {

    @Nested
    @DisplayName("1. IFs")
    class Ifs {

        @Test
        void pricesDomesticByWeight() {
            assertEquals(10.86, IfExample.shippingCost(new IfExample.Shipment("DOMESTIC", 0.8, false)), 0.0001);
        }

        @Test
        void freeShippingAboveTenKilos() {
            assertEquals(0.0, IfExample.shippingCost(new IfExample.Shipment("DOMESTIC", 12.0, false)), 0.0001);
        }

        @Test
        void expressDoublesTheWeightRate() {
            assertEquals(38.70, IfExample.shippingCost(new IfExample.Shipment("DOMESTIC", 12.0, true)), 0.0001);
            assertEquals(40.75, IfExample.shippingCost(new IfExample.Shipment("CONTINENTAL", 3.5, false)), 0.0001);
            assertEquals(65.02, IfExample.shippingCost(new IfExample.Shipment("INTERNATIONAL", 0.4, true)), 0.0001);
        }

        @Test
        void failsFastOnUnknownZone() {
            IllegalArgumentException error = assertThrows(IllegalArgumentException.class,
                    () -> IfExample.shippingCost(new IfExample.Shipment("MARS", 0.4, false)));
            assertEquals("Unknown zone: MARS", error.getMessage());
        }
    }

    @Nested
    @DisplayName("2. Switch")
    class Switches {

        @Test
        void responseTimeDependsOnSeverityAndTier() {
            assertEquals(15, SwitchExample.responseTimeMinutes(
                    new Ticket(Severity.CRITICAL, CustomerTier.FREE)));
            assertEquals(60, SwitchExample.responseTimeMinutes(
                    new Ticket(Severity.HIGH, CustomerTier.PREMIUM)));
            assertEquals(120, SwitchExample.responseTimeMinutes(
                    new Ticket(Severity.MEDIUM, CustomerTier.PREMIUM)));
            assertEquals(480, SwitchExample.responseTimeMinutes(
                    new Ticket(Severity.MEDIUM, CustomerTier.FREE)));
            assertEquals(1440, SwitchExample.responseTimeMinutes(
                    new Ticket(Severity.LOW, CustomerTier.STANDARD)));
        }

        @Test
        void rangesStillNeedAnIf() {
            assertEquals("GOLD", SwitchExample.slaBand(15));
            assertEquals("SILVER", SwitchExample.slaBand(16));
            assertEquals("SILVER", SwitchExample.slaBand(60));
            assertEquals("BRONZE", SwitchExample.slaBand(61));
            assertEquals("BRONZE", SwitchExample.slaBand(240));
            assertEquals("NONE", SwitchExample.slaBand(241));
        }
    }

    @Nested
    @DisplayName("3. SCM branches")
    class ScmBranches {

        private final ScmBranchExample.Cart cart = new ScmBranchExample.Cart(
                java.util.List.of(
                        new ScmBranchExample.Line("BOOK", 2, new BigDecimal("49.90")),
                        new ScmBranchExample.Line("MOUSE", 1, new BigDecimal("129.00"))),
                new BigDecimal("0.20"),
                new ScmBranchExample.Coupon("WELCOME10", new BigDecimal("0.10")));

        @AfterEach
        void clearBranchFlag() {
            System.clearProperty(BRANCH_PROPERTY);
        }

        @Test
        void mainChargesTaxOnTheFullSubtotal() {
            ScmBranchExample.Quote quote = new V1Pricing().quote(cart);
            assertEquals(new BigDecimal("228.80"), quote.subtotal());
            assertEquals(new BigDecimal("45.76"), quote.tax());
            assertEquals(new BigDecimal("274.56"), quote.total());
        }

        @Test
        void fixBranchAppliesTheCouponBeforeTax() {
            ScmBranchExample.Quote quote = new V2Pricing().quote(cart);
            assertEquals(new BigDecimal("41.18"), quote.tax());
            assertEquals(new BigDecimal("247.10"), quote.total());
        }

        @Test
        void branchFlagSelectsTheEngine() {
            assertInstanceOf(V1Pricing.class, ScmBranchExample.selectEngine());

            System.setProperty(BRANCH_PROPERTY, "feature/fix-coupon-order");
            assertInstanceOf(V2Pricing.class, ScmBranchExample.selectEngine());
        }

        @Test
        void unknownBranchFailsFast() {
            System.setProperty(BRANCH_PROPERTY, "feature/unknown");
            assertThrows(IllegalArgumentException.class, ScmBranchExample::selectEngine);
        }
    }
}
