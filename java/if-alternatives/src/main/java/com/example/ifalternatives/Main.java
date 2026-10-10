package com.example.ifalternatives;

import com.example.ifalternatives.basic.IfExample;
import com.example.ifalternatives.basic.ScmBranchExample;
import com.example.ifalternatives.basic.SwitchExample;
import com.example.ifalternatives.elegant.DecoratorExample;
import com.example.ifalternatives.elegant.FunctionalExample;
import com.example.ifalternatives.elegant.IfObjectExample;
import com.example.ifalternatives.generic.AnnotationExample;
import com.example.ifalternatives.generic.EnumExample;
import com.example.ifalternatives.generic.MapExample;
import com.example.ifalternatives.generic.MathExample;
import com.example.ifalternatives.generic.PropertiesExample;
import com.example.ifalternatives.generic.ReflectionExample;
import com.example.ifalternatives.polymorphism.InstanceOfExample;
import com.example.ifalternatives.polymorphism.PolymorphismExample;

public class Main {

    public static void main(String[] args) {
        banner("BASIC BRANCHES", "fast, always available, grows with every rule");
        section("1. IFs", IfExample::demo);
        section("2. Switch", SwitchExample::demo);
        section("3. SCM branches (git)", ScmBranchExample::demo);

        banner("GENERIC OPTIONS", "conciseness at the cost of the type system");
        section("4. Enums", EnumExample::demo);
        section("5. Maps", MapExample::demo);
        section("6. Properties", PropertiesExample::demo);
        section("7. Reflection", ReflectionExample::demo);
        section("8. Annotations", AnnotationExample::demo);
        section("9. Math", MathExample::demo);

        banner("ELEGANT OPTIONS", "readability first, performance is not the goal");
        section("10. IF objects", IfObjectExample::demo);
        section("11. Functional", FunctionalExample::demo);
        section("12. Composable decorators", DecoratorExample::demo);

        banner("POLYMORPHISM + TYPE SYSTEM", "let the compiler hold the decisions");
        section("13. Reflection and InstanceOf", InstanceOfExample::demo);
        section("14. Type System + Polymorphism", PolymorphismExample::demo);
    }

    private static void banner(String title, String subtitle) {
        System.out.println();
        System.out.println("=".repeat(78));
        System.out.println(title + " - " + subtitle);
        System.out.println("=".repeat(78));
    }

    private static void section(String title, Runnable demo) {
        System.out.println();
        System.out.println("--- " + title + " " + "-".repeat(Math.max(0, 74 - title.length())));
        demo.run();
    }
}
