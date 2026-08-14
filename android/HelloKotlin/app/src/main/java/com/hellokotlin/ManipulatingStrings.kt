package com.hellokotlin

class ManipulatingStrings {
    fun greeting() {
        val greeting = "Olá"
        val name = "Ana"

        println("${greeting}, ${name.capitalize()}")
    }

    fun stringMethods() {
        val myText = "   Meu texto   "

        println(myText.trim())
        println(myText.replace(" ", "*"))
    }

    fun isBlankOrEmpty() {
        val text = "  "

        println(text.isBlank())
        println(text.isEmpty())
        println(text.isNullOrBlank())
        println(text.isNullOrEmpty())
    }
}