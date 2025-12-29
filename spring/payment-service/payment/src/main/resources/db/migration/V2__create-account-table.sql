CREATE TABLE IF NOT EXISTS account (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_user_id UUID NOT NULL,
  balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  created_at DATE NOT NULL,
  CONSTRAINT fk_payment_user_id FOREIGN KEY(payment_user_id) REFERENCES payment_user(id)
);
