package com.example.buildtools;

import org.apache.commons.lang3.StringUtils;

public class Greeter {

    private final String greetingWord;

    public Greeter() {
        this("Hello");
    }

    public Greeter(String greetingWord) {
        this.greetingWord = greetingWord;
    }

    public String greet(String name) {
        String clean = name.trim();
        if (clean.isEmpty()) {
            throw new IllegalArgumentException("name must not be blank");
        }
        return greetingWord + ", " + StringUtils.capitalize(clean) + "!";
    }
}