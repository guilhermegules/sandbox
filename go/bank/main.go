package main

import "fmt"

type CheckingAccount struct {
	holder  string
	branch  int
	account int
	balance float64
}

func main() {
	fmt.Println(CheckingAccount{holder: "Guilherme", branch: 1, account: 1, balance: 1000})
	fmt.Println(CheckingAccount{"João", 231, 333, 200})

	var account *CheckingAccount
	account = new(CheckingAccount)
	account.holder = "João da silva"
	account.balance = 122.22
	fmt.Println(account)
	fmt.Println(*account)
}
