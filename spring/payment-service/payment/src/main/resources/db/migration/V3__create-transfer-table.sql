CREATE TABLE IF NOT EXISTS transfer (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  payer_id UUID NOT NULL,
  payee_id UUID NOT NULL,
  value DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  created_at DATE NOT NULL,
  CONSTRAINT fk_payer_id FOREIGN KEY(payer_id) REFERENCES account(id),
  CONSTRAINT fk_payee_id FOREIGN KEY(payee_id) REFERENCES account(id)
);
