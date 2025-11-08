package main

import "fmt"

type CheckingAccount struct {
	holder  string
	branch  int
	account int
	balance float64
}

func (c *CheckingAccount) Withdraw(withdrawValue float64) string {
	canWithdraw := withdrawValue > 0 && withdrawValue <= c.balance

	if canWithdraw {
		c.balance -= withdrawValue
		return "Withdraw made with success"
	}

	return "Balance insufficient"
}

func main() {
	account := CheckingAccount{holder: "Guilherme", branch: 1, account: 1, balance: 1000}

	fmt.Println(account.Withdraw(2000))
	fmt.Println(account.Withdraw(100))
	fmt.Println(account.Withdraw(-100))
	fmt.Println(account)
}
