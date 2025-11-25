package main

import (
	"bank/m/accounts"
	"fmt"
)

func main() {
	account := accounts.CheckingAccount{Holder: "Guilherme", Branch: 1, Account: 1, Balance: 1000}
	account2 := accounts.CheckingAccount{Holder: "John", Branch: 1, Account: 1, Balance: 2000}

	fmt.Println(account.Withdraw(2000))
	fmt.Println(account.Withdraw(100))
	fmt.Println(account.Withdraw(-100))
	fmt.Println(account)
	fmt.Println(account.Deposit(100))
	fmt.Println(account.Deposit(200))
	fmt.Println(account.Transfer(200, &account2))
	fmt.Println(account.Transfer(-200, &account2))
	fmt.Println(account)
	fmt.Println(account2)
}
