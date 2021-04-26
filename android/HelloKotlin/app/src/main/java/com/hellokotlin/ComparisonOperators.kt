package com.hellokotlin

const val EQUAL = 0
const val LESS = -1
const val MORE = 1
class ComparisonOperators {
    private val value1 = 100
    private val value2 = 200

    fun comparison() {
        println(value1 > value2)

        println(value1.compareTo(value2) == EQUAL)
        println(value1.compareTo(value2) == LESS)
        println(value1.compareTo(value2) == MORE)
        println(value1.equals(value2))
        println(value1 == value2)
    }

    fun usingInAndRange() {
        val numbers = listOf<Int>(3, 9, 10, 5)
        println(12 in numbers)

        println(12 in 0..20)
    }

    fun checkAge() {
        val maxAge = 68
        val minAge = 16
        var age = (10..100).random()
        println("Age:$age")
        println("Age is in range: " + age in minAge..maxAge)
        println(age >= minAge && age >= maxAge)
    }
}