package com.example;

public class PrimitivePatterns {

    public static String describePrimitive(int value) {
        return switch (value) {
            case 0 -> "Zero";
            case 1 -> "One";
            case 2 -> "Two";
            case int n when n < 0 -> "Negative: " + n;
            case int n when n > 100 -> "Big: " + n;
            default -> "Other: " + value;
        };
    }

    public static String describeObject(Object obj) {
        return switch (obj) {
            case Integer i -> "Integer: " + i;
            case Long l -> "Long: " + l;
            case Double d -> "Double: " + d;
            case Float f -> "Float: " + f;
            case Byte b -> "Byte: " + b;
            case Short s -> "Short: " + s;
            case Character c -> "Char: " + c;
            case Boolean b -> "Bool: " + b;
            default -> "Other: " + obj;
        };
    }

    public static void main(String[] args) {
        System.out.println(describePrimitive(0));
        System.out.println(describePrimitive(1));
        System.out.println(describePrimitive(-7));
        System.out.println(describePrimitive(200));
        System.out.println(describePrimitive(42));
        System.out.println(describeObject(3.5));
        System.out.println(describeObject((byte) 1));
        System.out.println(describeObject(true));
    }
}
