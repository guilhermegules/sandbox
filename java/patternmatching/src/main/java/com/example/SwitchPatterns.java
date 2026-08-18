package com.example;

public class SwitchPatterns {

    public static String shape(Shape shape) {
        return switch (shape) {
            case Circle c -> "Circle (area %.2f)".formatted(c.area());
            case Square s -> "Square (area %.2f)".formatted(s.area());
            case Rectangle r -> "Rectangle (area %.2f)".formatted(r.area());
            case Triangle t -> "Triangle (area %.2f)".formatted(t.area());
        };
    }

    public static String handleNull(Object obj) {
        return switch (obj) {
            case null -> "It's null";
            case String s -> "String: " + s;
            case Integer i -> "Integer: " + i;
            default -> "Something else";
        };
    }

    public static String dominanceDemo(Object obj) {
        return switch (obj) {
            case Integer i -> "Integer: " + i;
            case Number n -> "Number: " + n;
            default -> "Other";
        };
    }

    public static void main(String[] args) {
        System.out.println(shape(new Circle(2)));
        System.out.println(shape(new Rectangle(3, 4)));
        System.out.println(handleNull(null));
        System.out.println(handleNull("hi"));
        System.out.println(dominanceDemo(42));
        System.out.println(dominanceDemo(3.14));
    }
}
