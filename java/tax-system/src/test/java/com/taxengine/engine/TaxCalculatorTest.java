package com.taxengine.engine;

import com.taxengine.domain.model.Money;
import com.taxengine.domain.model.Product;
import com.taxengine.domain.model.State;
import com.taxengine.domain.model.TaxCategory;
import com.taxengine.domain.model.TaxCalculationRequest;
import com.taxengine.domain.model.TaxLineItem;
import com.taxengine.domain.model.TaxLineItemResult;
import com.taxengine.domain.model.TaxSummaryResult;
import com.taxengine.domain.rule.ExemptionRule;
import com.taxengine.domain.rule.StandardRateRule;
import com.taxengine.domain.rule.ThresholdRule;
import com.taxengine.repository.InMemoryTaxRuleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.Year;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class TaxCalculatorTest {

    private InMemoryTaxRuleRepository repository;
    private DefaultTaxCalculator calculator;

    @BeforeEach
    void setUp() {
        repository = new InMemoryTaxRuleRepository();
        calculator = new DefaultTaxCalculator(repository);

        Year year2024 = Year.of(2024);
        Year year2025 = Year.of(2025);

        repository.registerDefaultRule(State.CA, year2024, new StandardRateRule(new BigDecimal("0.0725")));
        repository.registerCategoryRule(State.CA, year2024, TaxCategory.GROCERY, new ExemptionRule("CA 2024 grocery exemption"));
        repository.registerCategoryRule(State.CA, year2024, TaxCategory.PRESCRIPTION_DRUG, new ExemptionRule("CA 2024 prescription exemption"));

        repository.registerDefaultRule(State.CA, year2025, new StandardRateRule(new BigDecimal("0.0750")));
        repository.registerCategoryRule(State.CA, year2025, TaxCategory.GROCERY, new ExemptionRule("CA 2025 grocery exemption"));

        repository.registerDefaultRule(State.TX, year2024, new StandardRateRule(new BigDecimal("0.0625")));
        repository.registerCategoryRule(State.TX, year2024, TaxCategory.GROCERY, new ExemptionRule("TX grocery exemption"));

        repository.registerDefaultRule(State.NY, year2025, new StandardRateRule(new BigDecimal("0.08875")));
        repository.registerCategoryRule(
                State.NY,
                year2025,
                TaxCategory.CLOTHING,
                new ThresholdRule(
                        Money.of("110.00"),
                        BigDecimal.ZERO,
                        new BigDecimal("0.0400"),
                        "NY clothing threshold exemption under $110"
                )
        );
    }

    @Test
    void shouldVaryTaxByYearForSameStateAndProduct() {
        Product laptop = new Product("SKU-1", "Laptop", TaxCategory.ELECTRONICS, Money.of("1000.00"));
        TaxLineItem item = new TaxLineItem(laptop, 1);

        TaxLineItemResult result2024 = calculator.calculateItem(State.CA, Year.of(2024), item);
        TaxLineItemResult result2025 = calculator.calculateItem(State.CA, Year.of(2025), item);

        assertThat(result2024.taxAmount()).isEqualTo(Money.of("72.50"));
        assertThat(result2025.taxAmount()).isEqualTo(Money.of("75.00"));
    }

    @Test
    void shouldVaryTaxByStateForSameYearAndProduct() {
        Product laptop = new Product("SKU-1", "Laptop", TaxCategory.ELECTRONICS, Money.of("1000.00"));
        TaxLineItem item = new TaxLineItem(laptop, 1);

        TaxLineItemResult caResult = calculator.calculateItem(State.CA, Year.of(2024), item);
        TaxLineItemResult txResult = calculator.calculateItem(State.TX, Year.of(2024), item);

        assertThat(caResult.taxAmount()).isEqualTo(Money.of("72.50"));
        assertThat(txResult.taxAmount()).isEqualTo(Money.of("62.50"));
    }

    @Test
    void shouldVaryTaxByProductCategoryInSameStateAndYear() {
        Product apple = new Product("SKU-G1", "Apples", TaxCategory.GROCERY, Money.of("10.00"));
        Product phone = new Product("SKU-E1", "Phone", TaxCategory.ELECTRONICS, Money.of("500.00"));

        TaxLineItemResult groceryResult = calculator.calculateItem(State.CA, Year.of(2024), new TaxLineItem(apple, 1));
        TaxLineItemResult electronicsResult = calculator.calculateItem(State.CA, Year.of(2024), new TaxLineItem(phone, 1));

        assertThat(groceryResult.taxAmount()).isEqualTo(Money.of("0.00"));
        assertThat(electronicsResult.taxAmount()).isEqualTo(Money.of("36.25"));
    }

    @Test
    void shouldApplyThresholdRulesForProductPricing() {
        Product cheapShirt = new Product("SHIRT-1", "T-Shirt", TaxCategory.CLOTHING, Money.of("50.00"));
        Product luxuryCoat = new Product("COAT-1", "Designer Coat", TaxCategory.CLOTHING, Money.of("200.00"));

        TaxLineItemResult cheapResult = calculator.calculateItem(State.NY, Year.of(2025), new TaxLineItem(cheapShirt, 1));
        TaxLineItemResult luxuryResult = calculator.calculateItem(State.NY, Year.of(2025), new TaxLineItem(luxuryCoat, 1));

        assertThat(cheapResult.taxAmount()).isEqualTo(Money.of("0.00"));
        assertThat(luxuryResult.taxAmount()).isEqualTo(Money.of("8.00"));
    }

    @Test
    void shouldCalculateCartSummaryAccurately() {
        Product apple = new Product("SKU-G1", "Apples", TaxCategory.GROCERY, Money.of("5.00"));
        Product phone = new Product("SKU-E1", "Phone", TaxCategory.ELECTRONICS, Money.of("500.00"));

        TaxCalculationRequest request = new TaxCalculationRequest(
                State.CA,
                Year.of(2024),
                List.of(
                        new TaxLineItem(apple, 4),
                        new TaxLineItem(phone, 2)
                )
        );

        TaxSummaryResult summary = calculator.calculate(request);

        assertThat(summary.totalSubtotal()).isEqualTo(Money.of("1020.00"));
        assertThat(summary.totalTax()).isEqualTo(Money.of("72.50"));
        assertThat(summary.grandTotal()).isEqualTo(Money.of("1092.50"));
        assertThat(summary.items()).hasSize(2);
    }
}
