package com.example.ifalternatives.elegant;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import com.example.ifalternatives.elegant.DecoratorExample.Cart;
import com.example.ifalternatives.elegant.DecoratorExample.Discount;
import com.example.ifalternatives.elegant.DecoratorExample.Line;
import com.example.ifalternatives.elegant.DecoratorExample.Money;
import com.example.ifalternatives.elegant.DecoratorExample.Price;
import com.example.ifalternatives.elegant.DecoratorExample.ShippingFee;
import com.example.ifalternatives.elegant.DecoratorExample.SubtotalPrice;
import com.example.ifalternatives.elegant.DecoratorExample.TaxRate;
import com.example.ifalternatives.elegant.FunctionalExample.Account;
import com.example.ifalternatives.elegant.IfObjectExample.Applicant;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class ElegantOptionsTest {

    @Nested
    @DisplayName("10. IF objects")
    class IfObjects {

        private final Applicant plain = applicant(IfObjectExample.Tier.STANDARD, 34, LocalDate.of(2022, 5, 1), 0, false);
        private final Applicant vip = applicant(IfObjectExample.Tier.VIP, 34, LocalDate.of(2022, 5, 1), 0, false);
        private final Applicant senior = applicant(IfObjectExample.Tier.STANDARD, 71, LocalDate.of(2011, 3, 9), 1, false);
        private final Applicant fraud = applicant(IfObjectExample.Tier.STANDARD, 29, LocalDate.of(2019, 2, 14), 4, false);
        private final Applicant blocked = applicant(IfObjectExample.Tier.VIP, 29, LocalDate.of(2019, 2, 14), 4, true);

        @Test
        void firstMatchingConditionWins() {
            assertEquals("standard", IfObjectExample.routeOf(plain));
            assertEquals("vip", IfObjectExample.routeOf(vip));
            assertEquals("senior", IfObjectExample.routeOf(senior));
            assertEquals("fraud-watch", IfObjectExample.routeOf(fraud));
            assertEquals("blocked", IfObjectExample.routeOf(blocked));
        }

        @Test
        void priorityFollowsTheSameOrder() {
            assertEquals(50, IfObjectExample.priorityOf(plain));
            assertEquals(20, IfObjectExample.priorityOf(vip));
            assertEquals(30, IfObjectExample.priorityOf(senior));
            assertEquals(10, IfObjectExample.priorityOf(fraud));
            assertEquals(0, IfObjectExample.priorityOf(blocked));
        }

        @Test
        void earlierConditionsOutrankLaterOnes() {
            Applicant vipButBlocked = applicant(IfObjectExample.Tier.VIP, 40, LocalDate.of(2001, 1, 1), 0, true);
            assertEquals("blocked", IfObjectExample.routeOf(vipButBlocked));
        }

        private Applicant applicant(IfObjectExample.Tier tier, int age, LocalDate since, int failures,
                boolean blocklisted) {
            return new Applicant(tier, age, since, failures, blocklisted);
        }
    }

    @Nested
    @DisplayName("11. Functional")
    class Functional {

        @Test
        void firstMatchingPredicateWins() {
            assertEquals("standard", FunctionalExample.settle(account(FunctionalExample.Tier.STANDARD, "120.50", 1, false)));
            assertEquals("vip", FunctionalExample.settle(account(FunctionalExample.Tier.VIP, "980.00", 0, false)));
            assertEquals("overdrawn", FunctionalExample.settle(account(FunctionalExample.Tier.STANDARD, "-40.00", 3, false)));
            assertEquals("dormant", FunctionalExample.settle(account(FunctionalExample.Tier.STANDARD, "12.00", 18, false)));
        }

        @Test
        void frozenOutranksEveryOtherRule() {
            assertEquals("frozen", FunctionalExample.settle(account(FunctionalExample.Tier.VIP, "980.00", 0, true)));
            assertEquals("frozen",
                    FunctionalExample.settle(account(FunctionalExample.Tier.STANDARD, "-40.00", 18, true)));
        }
    }

    @Nested
    @DisplayName("12. Composable decorators")
    class Decorators {

        private static final BigDecimal FEE = new BigDecimal("4.90");
        private static final BigDecimal DISCOUNT = new BigDecimal("0.10");
        private static final BigDecimal TAX = new BigDecimal("0.20");

        private final Price subtotal = new SubtotalPrice();
        private final Cart cart = new Cart(List.of(
                new Line("BOOK", 2, new BigDecimal("49.90")),
                new Line("MOUSE", 1, new BigDecimal("129.00"))));

        @Test
        void theInnermostDecoratorIsTheSubtotal() {
            assertEquals(new BigDecimal("228.80"), subtotal.of(cart).amount());
        }

        @Test
        void assemblyOrderChangesTheTotal() {
            Money feeThenDiscount = new Discount(new ShippingFee(subtotal, FEE), DISCOUNT).of(cart);
            Money discountThenFee = new ShippingFee(new Discount(subtotal, DISCOUNT), FEE).of(cart);

            assertEquals(new BigDecimal("210.33"), feeThenDiscount.amount());
            assertEquals(new BigDecimal("210.82"), discountThenFee.amount());
            assertNotEquals(feeThenDiscount, discountThenFee);
        }

        @Test
        void aFullPipelineStacksEveryRule() {
            Price pipeline = new ShippingFee(new TaxRate(new Discount(subtotal, DISCOUNT), TAX), FEE);
            assertEquals(new BigDecimal("252.00"), pipeline.of(cart).amount());
        }
    }

    private static Account account(FunctionalExample.Tier tier, String balance, int monthsIdle, boolean frozen) {
        return new Account(tier, new BigDecimal(balance), monthsIdle, frozen);
    }
}
