package one.digitalinnovation.digionebank.model

import kotlin.math.round

class Analyst(name: String, cpf: String, salary: Double) : Employee(name, cpf, salary) {
    override fun calcSupport(): Double = round(salary * 0.2)
}