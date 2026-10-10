package com.taxengine.repository;

import com.taxengine.domain.model.State;
import com.taxengine.domain.model.TaxCategory;
import com.taxengine.domain.rule.TaxRule;

import java.time.Year;
import java.util.Optional;

public interface TaxRuleRepository {

    Optional<TaxRule> findRule(State state, Year year, TaxCategory category);

    Optional<TaxRule> findDefaultRule(State state, Year year);

    void registerCategoryRule(State state, Year year, TaxCategory category, TaxRule rule);

    void registerDefaultRule(State state, Year year, TaxRule rule);
}
