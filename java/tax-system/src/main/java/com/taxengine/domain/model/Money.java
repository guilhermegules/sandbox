package com.taxengine.domain.model;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Currency;
import java.util.Objects;

public record Money(BigDecimal amount, Currency currency) implements Comparable<Money> {

    public static final Currency USD = Currency.getInstance("USD");
    public static final Money ZERO = of(BigDecimal.ZERO);

    public Money {
        Objects.requireNonNull(amount, "amount cannot be null");
        Objects.requireNonNull(currency, "currency cannot be null");
        amount = amount.setScale(2, RoundingMode.HALF_EVEN);
    }

    public static Money of(BigDecimal amount) {
        return new Money(amount, USD);
    }

    public static Money of(double amount) {
        return new Money(BigDecimal.valueOf(amount), USD);
    }

    public static Money of(String amount) {
        return new Money(new BigDecimal(amount), USD);
    }

    public Money plus(Money other) {
        assertSameCurrency(other);
        return new Money(this.amount.add(other.amount), this.currency);
    }

    public Money multiply(BigDecimal multiplier) {
        Objects.requireNonNull(multiplier, "multiplier cannot be null");
        return new Money(this.amount.multiply(multiplier), this.currency);
    }

    public Money multiply(int quantity) {
        return multiply(BigDecimal.valueOf(quantity));
    }

    public boolean isGreaterThan(Money other) {
        return compareTo(other) > 0;
    }

    public boolean isLessThanOrEqualTo(Money other) {
        return compareTo(other) <= 0;
    }

    private void assertSameCurrency(Money other) {
        if (!this.currency.equals(other.currency)) {
            throw new IllegalArgumentException("Currency mismatch: " + this.currency + " vs " + other.currency);
        }
    }

    @Override
    public int compareTo(Money o) {
        assertSameCurrency(o);
        return this.amount.compareTo(o.amount);
    }

    @Override
    public String toString() {
        return currency.getSymbol() + amount;
    }
}
