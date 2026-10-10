package com.example.ifalternatives.basic;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

/**
 * Technique 3 - SCM branches (git/svn/hg branches).
 *
 * <p>In the real world: you build V1 on {@code main} and V2 on {@code feature/fix-coupon-order},
 * the build produces one artifact per branch, and the merge is where the pain shows up.
 *
 * <p>PROS: might be the only solution (no backwards compatibility, no shared deployable).
 *
 * <p>CONS: harder to maintain, obscure, and both versions are never compiled together -
 * nothing checks that V2 still honors V1's contract.
 *
 * <p>JVM equivalent: a branch is a compile-time choice, so the only way to have both versions in
 * one process is a runtime kill switch. That is what this demo does: two engines, one selector.
 *
 * <pre>
 * mvn exec:java                                              # main
 * mvn exec:java -Difalternatives.branch=feature/fix-coupon-order
 * </pre>
 */
public class ScmBranchExample {

    static final String BRANCH_PROPERTY = "ifalternatives.branch";

    private static final Cart CART = new Cart(
            List.of(new Line("BOOK", 2, new BigDecimal("49.90")),
                    new Line("MOUSE", 1, new BigDecimal("129.00"))),
            new BigDecimal("0.20"),
            new Coupon("WELCOME10", new BigDecimal("0.10")));

    public static void demo() {
        System.out.println("branch flag = " + activeBranch());
        System.out.println("  main  -> " + new V1Pricing().quote(CART));
        System.out.println("  fix   -> " + new V2Pricing().quote(CART));
        System.out.println("  active-> " + selectEngine().quote(CART));
        System.out.println("  both versions coexist only because the branch became a runtime flag");
    }

    static String activeBranch() {
        return System.getProperty(BRANCH_PROPERTY, "main");
    }

    /** The only "if" the SCM approach gives you for free: which branch am I running. */
    static PricingEngine selectEngine() {
        return switch (activeBranch()) {
            case "feature/fix-coupon-order" -> new V2Pricing();
            case "main" -> new V1Pricing();
            default -> throw new IllegalArgumentException("Unknown branch: " + activeBranch());
        };
    }

    interface PricingEngine {
        Quote quote(Cart cart);
    }

    /** As committed on {@code main}: the discount is applied after tax. */
    static class V1Pricing implements PricingEngine {
        @Override
        public Quote quote(Cart cart) {
            BigDecimal subtotal = cart.subtotal();
            BigDecimal tax = money(subtotal.multiply(cart.taxRate()));
            return new Quote(subtotal, tax, money(subtotal.add(tax)), cart.coupon());
        }
    }

    /** As written on {@code feature/fix-coupon-order}: the discount comes before tax. */
    static class V2Pricing implements PricingEngine {
        @Override
        public Quote quote(Cart cart) {
            BigDecimal subtotal = cart.subtotal();
            BigDecimal discount = cart.coupon().discountOn(subtotal);
            BigDecimal taxable = subtotal.subtract(discount);
            BigDecimal tax = money(taxable.multiply(cart.taxRate()));
            return new Quote(subtotal, tax, money(taxable.add(tax)), cart.coupon());
        }
    }

    record Line(String sku, int quantity, BigDecimal unitPrice) {
    }

    record Cart(List<Line> lines, BigDecimal taxRate, Coupon coupon) {

        BigDecimal subtotal() {
            return lines.stream()
                    .map(line -> line.unitPrice().multiply(BigDecimal.valueOf(line.quantity())))
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
        }
    }

    record Coupon(String code, BigDecimal percent) {
        BigDecimal discountOn(BigDecimal amount) {
            return amount.multiply(percent).setScale(2, RoundingMode.HALF_UP);
        }
    }

    record Quote(BigDecimal subtotal, BigDecimal tax, BigDecimal total, Coupon coupon) {
        @Override
        public String toString() {
            return "total=" + total.toPlainString()
                    + " (subtotal=" + subtotal.toPlainString()
                    + ", tax=" + tax.toPlainString()
                    + ", " + coupon.code() + "=" + coupon.percent().toPlainString() + ")";
        }
    }

    private static BigDecimal money(BigDecimal value) {
        return value.setScale(2, RoundingMode.HALF_UP);
    }
}
