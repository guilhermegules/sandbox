package com.example.buildtools;

public class Main {

    private Main() {}

    public static void main(String[] args) {
        String name = args.length > 0 ? args[0] : "World";
        System.out.println(new Greeter().greet(name));
    }
}