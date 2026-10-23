package com.taxengine.engine;

import com.taxengine.domain.model.Money;
import com.taxengine.domain.model.State;
import com.taxengine.domain.model.TaxCalculationRequest;
import com.taxengine.domain.model.TaxLineItem;
import com.taxengine.domain.model.TaxLineItemResult;
import com.taxengine.domain.model.TaxSummaryResult;
import com.taxengine.domain.rule.ExemptionRule;
import com.taxengine.domain.rule.StandardRateRule;
import com.taxengine.domain.rule.TaxRule;
import com.taxengine.domain.rule.ThresholdRule;
import com.taxengine.repository.TaxRuleRepository;

import java.math.BigDecimal;
import java.time.Year;
import java.util.List;
import java.util.Objects;

public class DefaultTaxCalculator implements TaxCalculator {

    private final TaxRuleRepository repository;

    public DefaultTaxCalculator(TaxRuleRepository repository) {
        this.repository = Objects.requireNonNull(repository, "repository cannot be null");
    }

    @Override
    public TaxLineItemResult calculateItem(State state, Year year, TaxLineItem item) {
        TaxRule rule = repository.findRule(state, year, item.product().category())
                .orElseThrow(() -> new IllegalStateException(
                        "No tax rule resolved for state=" + state + ", year=" + year + ", category=" + item.product().category()
                ));

        Money subtotal = item.subtotal();

        return switch (rule) {
            case ExemptionRule(var description) ->
                    new TaxLineItemResult(
                            item.product(),
                            item.quantity(),
                            subtotal,
                            BigDecimal.ZERO,
                            Money.ZERO,
                            description
                    );

            case StandardRateRule(var rate, var description) -> {
                Money tax = subtotal.multiply(rate);
                yield new TaxLineItemResult(
                        item.product(),
                        item.quantity(),
                        subtotal,
                        rate,
                        tax,
                        description
                );
            }

            case ThresholdRule(var threshold, var belowRate, var aboveRate, var description) -> {
                boolean isBelowOrEqual = item.product().price().isLessThanOrEqualTo(threshold);
                BigDecimal effectiveRate = isBelowOrEqual ? belowRate : aboveRate;
                Money tax = subtotal.multiply(effectiveRate);
                yield new TaxLineItemResult(
                        item.product(),
                        item.quantity(),
                        subtotal,
                        effectiveRate,
                        tax,
                        description
                );
            }
        };
    }

    @Override
    public TaxSummaryResult calculate(TaxCalculationRequest request) {
        List<TaxLineItemResult> itemResults = request.items().stream()
                .map(item -> calculateItem(request.state(), request.year(), item))
                .toList();

        Money subtotal = itemResults.stream()
                .map(TaxLineItemResult::subtotal)
                .reduce(Money.ZERO, Money::plus);

        Money totalTax = itemResults.stream()
                .map(TaxLineItemResult::taxAmount)
                .reduce(Money.ZERO, Money::plus);

        Money grandTotal = subtotal.plus(totalTax);

        return new TaxSummaryResult(itemResults, subtotal, totalTax, grandTotal);
    }
}
