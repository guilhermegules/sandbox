package calculator

import kotlin.math.pow

class Calculator(firstNumber: Double?, secondNumber: Double?) {
    private var firstNumber: Double? = firstNumber
    private var secondNumber: Double? = secondNumber

    fun calculate(operation: () -> Double?): Double? {
        return operation()
    }

    fun sum(): Double? {
        return this.firstNumber?.plus(this.secondNumber!!)
    }

    fun minus(): Double? {
        return this.firstNumber?.minus(this.secondNumber!!)
    }

    fun times(): Double? {
        return this.firstNumber?.times(this.secondNumber!!)
    }

    fun div(): Double? {
        return this.firstNumber?.div(this.secondNumber!!)
    }

    fun percentage(): Double? {
        return this.firstNumber?.times(this.secondNumber!! / 100)
    }

    fun pow(): Double? {
        return this.firstNumber?.pow(this.secondNumber!!)
    }
}