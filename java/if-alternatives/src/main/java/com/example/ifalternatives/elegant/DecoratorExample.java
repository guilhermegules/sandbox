package com.example.ifalternatives.elegant;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

/**
 * Technique 12 - Composable Decorators: each rule wraps the previous one, so the order in which the
 * pipeline is assembled is the decision.
 *
 * <p>PROS: elegant pure-OO style, every wrapper is a complete object that composes with any other.
 * No enum, no map, no string keys - the type system still guards the composition.
 *
 * <p>CONS: more memory (one object per wrapper), a bit more complex to read, and the order
 * dependency is invisible at the call site: applying the shipping fee before the discount and after
 * it return different totals for the same cart, and nothing in the type system says so.
 */
public class DecoratorExample {

    private static final BigDecimal TAX_RATE = new BigDecimal("0.20");
    private static final BigDecimal WELCOME_DISCOUNT = new BigDecimal("0.10");
    private static final BigDecimal SHIPPING_FEE = new BigDecimal("4.90");

    private static final Cart CART = new Cart(List.of(
            new Line("BOOK", 2, new BigDecimal("49.90")),
            new Line("MOUSE", 1, new BigDecimal("129.00"))));

    public static void demo() {
        Price subtotal = new SubtotalPrice();
        System.out.println("same cart, four assemblies of the same rules:");
        System.out.printf("  subtotal only      -> %s%n", subtotal.of(CART));
        System.out.printf("  fee then discount  -> %s%n",
                new Discount(new ShippingFee(subtotal, SHIPPING_FEE), WELCOME_DISCOUNT).of(CART));
        System.out.printf("  discount then fee  -> %s%n",
                new ShippingFee(new Discount(subtotal, WELCOME_DISCOUNT), SHIPPING_FEE).of(CART));
        System.out.printf("  discount, tax, fee -> %s%n",
                new ShippingFee(
                        new TaxRate(new Discount(subtotal, WELCOME_DISCOUNT), TAX_RATE),
                        SHIPPING_FEE).of(CART));
        System.out.println("  fee is additive and discount multiplies: swapping them changes the total");
    }

    /** A decorator is just a Price that owns another Price. */
    interface Price {
        Money of(Cart cart);
    }

    record Money(BigDecimal amount) {

        static Money of(BigDecimal amount) {
            return new Money(amount.setScale(2, RoundingMode.HALF_UP));
        }

        @Override
        public String toString() {
            return "EUR " + amount.toPlainString();
        }
    }

    /** The innermost decorator: no decision, just the number the chain starts from. */
    static class SubtotalPrice implements Price {
        @Override
        public Money of(Cart cart) {
            return Money.of(cart.lines().stream()
                    .map(line -> line.unitPrice().multiply(BigDecimal.valueOf(line.quantity())))
                    .reduce(BigDecimal.ZERO, BigDecimal::add));
        }
    }

    record TaxRate(Price origin, BigDecimal rate) implements Price {
        @Override
        public Money of(Cart cart) {
            return Money.of(origin.of(cart).amount().multiply(BigDecimal.ONE.add(rate)));
        }
    }

    record Discount(Price origin, BigDecimal percent) implements Price {
        @Override
        public Money of(Cart cart) {
            return Money.of(origin.of(cart).amount().multiply(BigDecimal.ONE.subtract(percent)));
        }
    }

    record ShippingFee(Price origin, BigDecimal fee) implements Price {
        @Override
        public Money of(Cart cart) {
            return Money.of(origin.of(cart).amount().add(fee));
        }
    }

    record Line(String sku, int quantity, BigDecimal unitPrice) {
    }

    record Cart(List<Line> lines) {
    }
}
