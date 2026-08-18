package com.example;

public class GuardedPatterns {

    public static String classify(Shape shape) {
        return switch (shape) {
            case Circle c when c.radius() < 1 ->
                    "Tiny circle, radius " + c.radius();
            case Circle c ->
                    "Normal circle, radius " + c.radius();
            case Rectangle r when r.width() == r.height() ->
                    "Rectangle that is actually a square of side " + r.width();
            case Rectangle r ->
                    "Rectangle " + r.width() + "x" + r.height();
            case Square s when s.side() > 100 ->
                    "Huge square with side " + s.side();
            case Square s ->
                    "Square with side " + s.side();
            case Triangle t ->
                    "Triangle with base " + t.base();
        };
    }

    public static void main(String[] args) {
        System.out.println(classify(new Circle(0.5)));
        System.out.println(classify(new Circle(3)));
        System.out.println(classify(new Rectangle(5, 5)));
        System.out.println(classify(new Rectangle(4, 9)));
        System.out.println(classify(new Square(500)));
        System.out.println(classify(new Square(2)));
        System.out.println(classify(new Triangle(6, 2)));
    }
}
