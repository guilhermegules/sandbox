package main

import (
	"bank/m/accounts"
	"bank/m/clients"
	"fmt"
)

func main() {
	account := accounts.CheckingAccount{
		Holder: clients.Holder{Name: "Guilherme", Cpf: "123", Profession: "dev"}, Branch: 1, Account: 1,
	}
	account2 := accounts.CheckingAccount{
		Holder: clients.Holder{Name: "Jonh", Cpf: "333", Profession: "sre"}, Branch: 1, Account: 1,
	}

	fmt.Println(account.Deposit(1000))
	fmt.Println(account.Deposit(2000))
	fmt.Println(account.Withdraw(2000))
	fmt.Println(account.Withdraw(100))
	fmt.Println(account.Withdraw(-100))
	fmt.Println(account)
	fmt.Println(account.Transfer(200, &account2))
	fmt.Println(account.Transfer(-200, &account2))
	fmt.Println(account)
	fmt.Println(account2)
	fmt.Println(account2.GetBalance())
}
