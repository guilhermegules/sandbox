package com.hellokotlin

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

const val MY_CONSTANT = 10

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
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

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }
}