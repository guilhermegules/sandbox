package one.digitalinnovation.digionebank.view

import one.digitalinnovation.digionebank.model.Bank
import one.digitalinnovation.digionebank.model.Person

fun main() {
    val person = Person()
    val bank = Bank("DigiOneBank", 111)
    val bankCopy = bank.copy(name = "Testing")

    println(person.Address().street)
    println(person.showPersonData())
    println(bank.name)
    println(bank.number)
    println(bank.info())
    println(bankCopy.name)
    println(bankCopy.number)
}
