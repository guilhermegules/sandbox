package com.example.ifalternatives.elegant;

import java.time.LocalDate;
import java.util.List;

/**
 * Technique 10 - If Objects: every condition becomes a named, testable object.
 *
 * <p>PROS: concise, very readable at the call site ({@link #ROUTES} is a table, not a block of
 * branches), and each condition can be unit tested in isolation or reused by another decision.
 *
 * <p>CONS: more memory - one object per condition, on a path that was previously a couple of
 * comparisons. The loop's {@code if} does not disappear, it is just no longer inline.
 */
public class IfObjectExample {

    private static final List<Route> ROUTES = List.of(
            new Route("blocked", a -> a.blocklisted(), "manual review"),
            new Route("fraud-watch", a -> a.recentFailures() >= 3, "hold and call"),
            new Route("vip", a -> a.tier() == Tier.VIP, "dedicated agent"),
            new Route("senior", a -> a.age() >= 65, "priority queue"),
            new Route("subscriber", a -> a.since().isBefore(LocalDate.of(2020, 1, 1)),
                    "loyalty benefits"));

    private static final List<Applicant> APPLICANTS = List.of(
            new Applicant(Tier.STANDARD, 34, LocalDate.of(2022, 5, 1), 0, false),
            new Applicant(Tier.VIP, 34, LocalDate.of(2022, 5, 1), 0, false),
            new Applicant(Tier.STANDARD, 71, LocalDate.of(2011, 3, 9), 1, false),
            new Applicant(Tier.STANDARD, 29, LocalDate.of(2019, 2, 14), 4, false),
            new Applicant(Tier.VIP, 29, LocalDate.of(2019, 2, 14), 4, true));

    public static void demo() {
        System.out.println("conditions are objects, the decision is a lookup over a list:");
        for (Route route : ROUTES) {
            System.out.printf("  if (%-12s) -> %s%n", route.name(), route.outcome());
        }
        System.out.println();
        for (Applicant applicant : APPLICANTS) {
            System.out.printf("  %-56s -> %-12s queue=%d%n",
                    applicant, routeOf(applicant), priorityOf(applicant));
        }
    }

    /** The only branch left in the method: which object in the list says yes. */
    static String routeOf(Applicant applicant) {
        for (Route route : ROUTES) {
            if (route.holds(applicant)) {
                return route.name();
            }
        }
        return "standard";
    }

    /**
     * The reuse argument: the same if-objects drive a second decision, so the business knowledge
     * exists once. With inline ifs this method would duplicate all five conditions.
     */
    static int priorityOf(Applicant applicant) {
        int priority = 0;
        for (Route route : ROUTES) {
            if (route.holds(applicant)) {
                return priority;
            }
            priority += 10;
        }
        return priority;
    }

    /** The condition, as an object. */
    interface If {
        boolean holds(Applicant applicant);
    }

    /** An if object that also knows what to do when it holds - the Elegant Objects shape. */
    record Route(String name, If condition, String outcome) implements If {

        @Override
        public boolean holds(Applicant applicant) {
            return condition.holds(applicant);
        }
    }

    enum Tier {
        STANDARD,
        VIP
    }

    record Applicant(Tier tier, int age, LocalDate since, int recentFailures, boolean blocklisted) {
    }
}
