package one.digitalinnovation.digionebank.model

abstract class Employee(override val name: String, override val cpf: String, open val salary: Double) : Person(name, cpf) {
    abstract fun calcSupport(): Double

    override fun toString(): String = """
        Name: $name
        CPF: $cpf
        Salary: $salary
        Support: ${calcSupport()}
    """.trimIndent()
}