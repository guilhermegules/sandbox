package one.digitalinnovation.digionebank.view

import one.digitalinnovation.digionebank.enums.ClientTypeEnum
import one.digitalinnovation.digionebank.model.*
import one.digitalinnovation.digionebank.utils.EmployeeUtils

fun main() {
    val bank = Bank("DigiOneBank", 111)
    val bankCopy = bank.copy(name = "Testing")
    val clientPF = ClientTypeEnum.PF
    val clientPJ = ClientTypeEnum.PJ
    val employee = Manager("Guilherme Gules Moreira", "000.000.000-00", 5000.00, "123")
    val analyst = Analyst("João da Silva", "222.222.222-01", 4000.00)
    val client = Client(name = "José da silva", cpf ="123.456.789-10", clientType = ClientTypeEnum.PF, password = "123456789")

    ClientTypeEnum.values().forEach { clientType ->
        println("${clientType.name} - ${clientType.description}")
    }


    println(bank.name)
    println(bank.number)
    println(bank.info())
    println(bankCopy.name)
    println(bankCopy.number)

    println("-> ${clientPF.name} - ${clientPF.description}")
    println("-> ${clientPJ.name} - ${clientPJ.description}")

    EmployeeUtils.report(employee)
    EmployeeUtils.report(analyst)
    println("The user can login? ${if(employee.login()) "Yes" else "No"}")

    println(client.toString())
    println("The user can login? ${if(client.login()) "Yes" else "No"}")
}