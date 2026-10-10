package com.example.buildtools;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

class GreeterTest {

    private final Greeter greeter = new Greeter();

    @Test
    void greetsByName() {
        assertEquals("Hello, Guilherme!", greeter.greet("guilherme"));
    }

    @Test
    void trimsAndCapitalizes() {
        assertEquals("Hello, World!", greeter.greet("  world  "));
    }

    @Test
    void customGreetingWord() {
        Greeter g = new Greeter("Olá");
        assertEquals("Olá, Maria!", g.greet("maria"));
    }

    @Test
    void blankNameIsRejected() {
        assertThrows(IllegalArgumentException.class, () -> greeter.greet("   "));
    }
}