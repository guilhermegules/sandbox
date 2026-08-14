package com.hellokotlin

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

const val MY_CONSTANT = 10

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        val arithmeticOperators = ArithmeticOperators()
        val comparisonOperators = ComparisonOperators()
        val manipulatingStrings = ManipulatingStrings()
        println("Hello, Kotlin!")

        // Data types
        /*
        * Int
        * Long
        * Float
        * Double
        * Array
        * Boolean
        * Char
        * Byte
        * Short
        * Null!
        * */

        // Max values constants
        println("Max Int " + Int.MAX_VALUE)
        println("Max Float " + Float.MAX_VALUE)
        println("Max Long " + Long.MAX_VALUE)
        println("Max Byte " + Byte.MAX_VALUE)
        println("Max Short " + Short.MAX_VALUE)

        // Type parses
        /*
        * toByte()
        * toShort()
        * toDouble()
        * toInt()
        * toLong()
        * toFloat()
        * toDouble()
        * toChar()
        * */

        var myVar = "mutable"
        val myVal = "immutable"

        println(myVar)
        println(myVal)
        println(MY_CONSTANT)

        arithmeticOperators.arithmetic()
        arithmeticOperators.arithmeticMethods()

        comparisonOperators.comparison()
        comparisonOperators.usingInAndRange()
        comparisonOperators.checkAge()

        manipulatingStrings.greeting()
        manipulatingStrings.stringMethods()
        manipulatingStrings.isBlankOrEmpty()

        val a: Int = 10
        val b: Int = 5
        var result: Int = 0

        fun sum(a: Int, b: Int) = a.plus(b)

        fun calculate(a: Int, b: Int, operation: (Int, Int) -> Int): Int {
            return operation(a, b)
        }

        result = calculate(a, b, ::sum)

        println(result)

        // Conditionals
        val number = 1

        if(number >= 0) {
            println("Number is bigger or equal zero")
        } else if(number == 100) {
            println("Number is equal 100")
        } else {
            println("Is another number")
        }

        when {
            number >= 0 -> {
                println("number is bigger or equal zero")
            }
            else -> {
                println("Is another number")
            }
        }

        val nullableVal: Int? = null
        var notNullable = a ?: 0

        val year = 1200

        when(year) {
            in -4000..475 -> {
                println("Antiguidade")
            }
            in 475..1200 -> {
                println("Idade média")
            }
        }

        var i = 0

        while(i < 10) {
            i++
            println(i)
        }

        var y = 0
        var letters = "letters"

        do {
            println(y)
        } while(y < 10)

        var z = 0

        for(z in 0..20 step 2) {
            println(z)
        }

        for(z in 20 downTo 0) {
            println(z)
        }

        for(z in 0 until 20) {
            println(z)
        }

        for(letter in letters) {
            println(letter.toUpperCase())
        }

        letters.forEach { a -> println(a) }

        // "in" conta do valor inicial até o valor final estabelecido
        // "until" conta do valor atual até o valor estabelecido menos 1
        // "downTo" conta de maneira descrescente
        // "step" determina o intervalo da contagem

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }
}