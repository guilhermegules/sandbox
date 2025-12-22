export type EnrichedOrder = {
  order: { id: string; value: number };
  processedAt: string;
  totalWithTax: number;
};
