package one.digitalinnovation.digionebank.utils

import one.digitalinnovation.digionebank.model.Employee

class EmployeeUtils {
    companion object {
        fun report(employee: Employee) {
            println(employee.toString())
        }
    }
}