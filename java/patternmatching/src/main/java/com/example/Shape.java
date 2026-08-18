package com.example;

public sealed interface Shape permits Circle, Square, Rectangle, Triangle {
    double area();
}
