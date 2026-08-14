package domain

import (
	"time"
)

type EnrichedOrder struct {
	Order        Order     `json:"order"`
	ProcessedAt  time.Time `json:"processedAt"`
	TotalWithTax float64   `json:"totalWithTax"`
}
