package com.example;

public class Main {

    public static void main(String[] args) {
        System.out.println("== instanceof patterns ==");
        InstanceOfPatterns.main(args);

        System.out.println("\n== switch type patterns ==");
        SwitchPatterns.main(args);

        System.out.println("\n== record patterns ==");
        RecordPatterns.main(args);

        System.out.println("\n== guarded patterns ==");
        GuardedPatterns.main(args);

        System.out.println("\n== primitive patterns ==");
        PrimitivePatterns.main(args);
    }
}
