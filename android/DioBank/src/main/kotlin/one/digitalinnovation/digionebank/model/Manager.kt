package one.digitalinnovation.digionebank.model

import kotlin.math.round

class Manager(override val name: String, override val cpf: String, override val salary: Double ) : Employee(name, cpf, salary) {
    override fun calcSupport(): Double {
        return round(salary * 0.4)
    }
}

