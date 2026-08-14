package main

import (
	"bank/m/accounts"
	"bank/m/clients"
	"fmt"
)

type verifyAccount interface {
	Withdraw(value float64) string
}

func PayBill(account verifyAccount, billValue float64) {
	account.Withdraw(billValue)
}

func main() {
	account := accounts.CheckingAccount{
		Holder: clients.Holder{Name: "Guilherme", Cpf: "123", Profession: "dev"}, Branch: 1, Account: 1,
	}

	account2 := accounts.CheckingAccount{
		Holder: clients.Holder{Name: "Jonh", Cpf: "333", Profession: "sre"}, Branch: 1, Account: 1,
	}

	savingAccount := accounts.SavingAccount{
		Holder: clients.Holder{Name: "Guilherme", Cpf: "123", Profession: "dev"}, Agency: 1, Account: 1,
		Operation: 1,
	}

	fmt.Println(savingAccount)
	fmt.Println(savingAccount.Deposit(1000))
	fmt.Println(savingAccount.Withdraw(500))
	fmt.Println(savingAccount.GetBalance())

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
	PayBill(&account, 60)
	PayBill(&savingAccount, 60)
	fmt.Println(savingAccount.GetBalance())
	fmt.Println(account.GetBalance())
}
