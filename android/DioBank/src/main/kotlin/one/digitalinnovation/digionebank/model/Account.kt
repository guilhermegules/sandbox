package one.digitalinnovation.digionebank.model

class Account(val agency: String, val number: String, balance: Double) {
    fun deposit(value: Double) {
        println("Deposited value: $value")
    }

    fun withdraw(value: Double) {
        println("Withdraw value: $value")
    }
}