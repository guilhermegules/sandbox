package one.digitalinnovation.digionebank.model

import kotlin.math.round

class Manager(override val name: String, override val cpf: String, override val salary: Double, val password: String) : Employee(name, cpf, salary), CanLogin {
    override fun calcSupport(): Double {
        return round(salary * 0.4)
    }

    override fun login(): Boolean {
        return this.password == "123"
    }
}

