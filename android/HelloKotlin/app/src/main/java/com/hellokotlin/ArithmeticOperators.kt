package com.hellokotlin

class ArithmeticOperators {
    var a = 10
    var b = 10

    fun arithmetic() {
        println(a + b)
        println(a - b)
        println(a * b)
        println(a / b)
        println(a % b)
    }

    fun arithmeticMethods() {
        println(a.plus(b))
        println(a.minus(b))
        println(a.times(b))
        println(a.div(b))
    }
}