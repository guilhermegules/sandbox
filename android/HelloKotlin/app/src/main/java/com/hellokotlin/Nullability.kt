package com.hellokotlin

class Nullability {
    // Nullability
    /**
     * Any type can be null, but we need to declare a type with a ?, type inference not attribute nullability
     */
    var month: Int? = null // Let we add null values on out var
    // var day: Int = null // We will get a error because this var are not declared with ?
}