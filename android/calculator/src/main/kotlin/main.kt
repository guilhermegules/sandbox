import calculator.Calculator

fun main() {
    var secondNumber: Double? = null
    var result: Double? = null

    print("Digit the operation: ")
    val operation: String? = readLine()
    print("Digit the first number: ")
    val firstNumber = readLine()!!.toDouble()

    val calculator = Calculator(firstNumber, secondNumber)

    when(operation) {
        "+" -> {
             result = calculator.calculate(calculator::sum)
        }
        "-" -> {
            result = calculator.calculate(calculator::minus)
        }
        "*" -> {
            result = calculator.calculate(calculator::times)
        }
        "/" -> {
            result = calculator.calculate(calculator::div)
        }
        "%" -> {
            result = calculator.calculate(calculator::percentage)
        }
        "pow" -> {
            result = calculator.calculate(calculator::pow)
        }
        else -> {
            println("Invalid operation")
        }
    }

    if(result != null) {
        println("Result: $result")
    }
}