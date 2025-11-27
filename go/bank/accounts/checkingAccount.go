package accounts

import "bank/m/clients"

type CheckingAccount struct {
	Holder          clients.Holder
	Branch, Account int
	balance         float64
}

func (c *CheckingAccount) Withdraw(withdrawValue float64) string {
	canWithdraw := withdrawValue > 0 && withdrawValue <= c.balance

	if canWithdraw {
		c.balance -= withdrawValue
		return "Withdraw made with success"
	}

	return "Balance insufficient"
}

func (c *CheckingAccount) Deposit(depositValue float64) (string, float64) {
	if depositValue > 0 {
		c.balance += depositValue
		return "Deposit successfully", c.balance
	}

	return "Deposit value is lower than zero", c.balance
}

func (c *CheckingAccount) Transfer(transferValue float64, destinationAccount *CheckingAccount) bool {
	if transferValue < c.balance && transferValue > 0 {
		c.balance -= transferValue
		destinationAccount.Deposit(transferValue)
		return true
	}

	return false
}

func (c *CheckingAccount) GetBalance() float64 {
	return c.balance
}
