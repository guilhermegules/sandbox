package com.taxengine.engine;

import com.taxengine.domain.model.State;
import com.taxengine.domain.model.TaxCalculationRequest;
import com.taxengine.domain.model.TaxLineItem;
import com.taxengine.domain.model.TaxLineItemResult;
import com.taxengine.domain.model.TaxSummaryResult;

import java.time.Year;

public interface TaxCalculator {

    TaxLineItemResult calculateItem(State state, Year year, TaxLineItem item);

    TaxSummaryResult calculate(TaxCalculationRequest request);
}
