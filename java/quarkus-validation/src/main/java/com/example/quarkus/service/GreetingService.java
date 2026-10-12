package com.example.quarkus.service;

import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@ApplicationScoped
public class GreetingService {

    @ConfigProperty(name = "greeting.prefix", defaultValue = "Hello from Quarkus")
    String greetingPrefix;

    public String buildGreeting(String name) {
        return greetingPrefix + ", " + name + "!";
    }
}
