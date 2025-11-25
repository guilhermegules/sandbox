package accounts

type CheckingAccount struct {
	Holder  string
	Branch  int
	Account int
	Balance float64
}

func (c *CheckingAccount) Withdraw(withdrawValue float64) string {
	canWithdraw := withdrawValue > 0 && withdrawValue <= c.Balance

	if canWithdraw {
		c.Balance -= withdrawValue
		return "Withdraw made with success"
	}

	return "Balance insufficient"
}

func (c *CheckingAccount) Deposit(depositValue float64) (string, float64) {
	if depositValue > 0 {
		c.Balance += depositValue
		return "Deposit successfully", c.Balance
	}

	return "Deposit value is lower than zero", c.Balance
}

func (c *CheckingAccount) Transfer(transferValue float64, destinationAccount *CheckingAccount) bool {
	if transferValue < c.Balance && transferValue > 0 {
		c.Balance -= transferValue
		destinationAccount.Deposit(transferValue)
		return true
	}

	return false
}
