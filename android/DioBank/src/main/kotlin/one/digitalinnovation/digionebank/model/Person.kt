package one.digitalinnovation.digionebank.model

class Person {
    private var name: String = "Guilherme Gules"
    private var cpf: String = "000.000.000-05"

    inner class Address {
        var street = "street test"
    }

    fun showPersonData() = "$name have the CPF: $cpf"
}
