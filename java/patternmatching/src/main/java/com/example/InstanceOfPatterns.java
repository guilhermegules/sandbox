package com.example;

public class InstanceOfPatterns {

    public static String describe(Object obj) {
        if (obj instanceof String s) {
            return "String of length " + s.length();
        } else if (obj instanceof Integer i) {
            return "Integer with value " + i;
        } else if (obj instanceof Circle c) {
            return "Circle with radius " + c.radius();
        } else {
            return "Unknown: " + obj;
        }
    }

    public static String scopingDemo(Object obj) {
        if (obj instanceof String s && !s.isEmpty()) {
            return "Non-empty string: " + s.toUpperCase();
        }
        return "Empty or not a string";
    }

    public static String legacyInstanceof(Object obj) {
        if (obj instanceof String) {
            String s = (String) obj;
            return "Legacy cast needed: " + s.length();
        }
        return "Not a string";
    }

    public static void main(String[] args) {
        System.out.println(describe("hello"));
        System.out.println(describe(42));
        System.out.println(describe(new Circle(3)));
        System.out.println(describe(new Object()));
        System.out.println(scopingDemo(""));
        System.out.println(scopingDemo("hi"));
        System.out.println(legacyInstanceof("abc"));
    }
}
