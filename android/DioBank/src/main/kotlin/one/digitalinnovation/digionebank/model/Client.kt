package one.digitalinnovation.digionebank.model

import one.digitalinnovation.digionebank.enums.ClientTypeEnum

class Client(name: String, cpf: String, private val clientType: ClientTypeEnum, private val password: String) : Person(name, cpf), CanLogin {
    override fun login(): Boolean {
        return this.password == "123456789"
    }

    override fun toString(): String = """
        Name: $name
        CPF: $cpf
        Type: ${clientType.description}
    """.trimIndent()
}