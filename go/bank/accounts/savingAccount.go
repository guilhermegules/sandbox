package accounts

import "bank/m/clients"

type SavingAccount struct {
	Holder                     clients.Holder
	Agency, Account, Operation int
	balance                    float64
}

func (c *SavingAccount) Withdraw(withdrawValue float64) string {
	canWithdraw := withdrawValue > 0 && withdrawValue <= c.balance

	if canWithdraw {
		c.balance -= withdrawValue
		return "Withdraw made with success"
	}

	return "Balance insufficient"
}

func (c *SavingAccount) Deposit(depositValue float64) (string, float64) {
	if depositValue > 0 {
		c.balance += depositValue
		return "Deposit successfully", c.balance
	}

	return "Deposit value is lower than zero", c.balance
}

func (c *SavingAccount) GetBalance() float64 {
	return c.balance
}
