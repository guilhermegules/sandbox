package com.taxengine.repository;

import com.taxengine.domain.model.State;
import com.taxengine.domain.model.TaxCategory;
import com.taxengine.domain.rule.TaxRule;

import java.time.Year;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

public class InMemoryTaxRuleRepository implements TaxRuleRepository {

    public record CategoryRuleKey(State state, Year year, TaxCategory category) {
        public CategoryRuleKey {
            Objects.requireNonNull(state, "state cannot be null");
            Objects.requireNonNull(year, "year cannot be null");
            Objects.requireNonNull(category, "category cannot be null");
        }
    }

    public record StateYearKey(State state, Year year) {
        public StateYearKey {
            Objects.requireNonNull(state, "state cannot be null");
            Objects.requireNonNull(year, "year cannot be null");
        }
    }

    private final Map<CategoryRuleKey, TaxRule> categoryRules = new ConcurrentHashMap<>();
    private final Map<StateYearKey, TaxRule> defaultRules = new ConcurrentHashMap<>();

    @Override
    public Optional<TaxRule> findRule(State state, Year year, TaxCategory category) {
        TaxRule rule = categoryRules.get(new CategoryRuleKey(state, year, category));
        if (rule != null) {
            return Optional.of(rule);
        }
        return findDefaultRule(state, year);
    }

    @Override
    public Optional<TaxRule> findDefaultRule(State state, Year year) {
        return Optional.ofNullable(defaultRules.get(new StateYearKey(state, year)));
    }

    @Override
    public void registerCategoryRule(State state, Year year, TaxCategory category, TaxRule rule) {
        Objects.requireNonNull(rule, "rule cannot be null");
        categoryRules.put(new CategoryRuleKey(state, year, category), rule);
    }

    @Override
    public void registerDefaultRule(State state, Year year, TaxRule rule) {
        Objects.requireNonNull(rule, "rule cannot be null");
        defaultRules.put(new StateYearKey(state, year), rule);
    }
}
