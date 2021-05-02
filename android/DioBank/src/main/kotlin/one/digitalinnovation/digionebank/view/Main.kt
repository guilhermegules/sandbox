package one.digitalinnovation.digionebank.view

import one.digitalinnovation.digionebank.enums.ClientTypeEnum
import one.digitalinnovation.digionebank.model.*
import one.digitalinnovation.digionebank.utils.EmployeeUtils

fun main() {
    val bank = Bank("DigiOneBank", 111)
    val bankCopy = bank.copy(name = "Testing")
    val clientPF = ClientTypeEnum.PF
    val clientPJ = ClientTypeEnum.PJ
    val employee = Manager("Guilherme Gules Moreira", "000.000.000-00", 5000.00)
    val analist = Analyst("João da Silva", "222.222.222-01", 4000.00)

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
    EmployeeUtils.report(analist)
}