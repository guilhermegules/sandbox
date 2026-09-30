package com.example.ifalternatives.polymorphism;

import java.util.List;

/**
 * Technique 13 - Reflection and InstanceOf: dispatch on the runtime type with {@code instanceof}
 * patterns, and the {@code switch} form that replaces a long chain.
 *
 * <p>PROS: more elegant than a name-based lookup, and the data stays typed.
 *
 * <p>CONS: a bit more complex, and it breaks the type system - {@code instanceof} is resolved at
 * runtime, so nothing forces you to handle a new subtype. That is the whole difference with
 * technique 14: here the compiler cannot tell you that you forgot a case.
 */
public class InstanceOfExample {

    private static final List<Notification> NOTIFICATIONS = List.of(
            new Email("guilherme@example.com", "receipt", "Your invoice is ready"),
            new Sms("+351912345678", "Your code is 4821"),
            new Push("device-7f2a", "Order shipped"),
            new Webhook("https://partner.example.com/hooks", "{\"event\":\"order.shipped\"}"));

    public static void demo() {
        System.out.println("if-chain on runtime type, and the switch that replaces it:");
        for (Notification notification : NOTIFICATIONS) {
            System.out.printf("  %-9s if=%-46s switch=%s%n",
                    notification.channel(),
                    describeByInstanceOf(notification),
                    describeBySwitch(notification));
        }

        System.out.println("  and the record pattern, which reads the payload without a cast:");
        for (Notification notification : NOTIFICATIONS) {
            System.out.printf("  %-9s -> %s%n", notification.channel(), routeWithPattern(notification));
        }

        System.out.println("  a subtype nobody handled - the if-chain and the switch both need a default:");
        Notification unknown = new Unknown();
        System.out.printf("  %-9s if=%-46s switch=%s%n",
                unknown.channel(), describeByInstanceOf(unknown), describeBySwitch(unknown));
    }

    /** The classic chain: correct, and it grows one line per new subtype. */
    static String describeByInstanceOf(Notification notification) {
        if (notification instanceof Email email) {
            return "smtp -> " + email.to();
        }
        if (notification instanceof Sms sms) {
            return "gateway -> " + sms.phone();
        }
        if (notification instanceof Push push) {
            return "fcm -> " + push.device();
        }
        if (notification instanceof Webhook webhook) {
            return "http -> " + webhook.url();
        }
        return "unsupported";
    }

    /** The same decision as a switch - but it needs a {@code default}, or it stops compiling. */
    static String describeBySwitch(Notification notification) {
        return switch (notification) {
            case Email email -> "smtp -> " + email.to();
            case Sms sms -> "gateway -> " + sms.phone();
            case Push push -> "fcm -> " + push.device();
            case Webhook webhook -> "http -> " + webhook.url();
            default -> "unsupported";
        };
    }

    /** A record pattern destructures the payload: the cast disappears too. */
    static String routeWithPattern(Notification notification) {
        return switch (notification) {
            case Email(String to, String subject, String body) ->
                    "smtp -> " + to + " (" + body.length() + " chars)";
            case Sms(String phone, String body) -> "gateway -> " + phone + " (" + body + ")";
            case Push push -> "fcm -> " + push.device();
            case Webhook(String url, String payload) ->
                    "http -> " + url + " (" + payload.length() + " bytes)";
            default -> "unsupported";
        };
    }

    /**
     * Not sealed on purpose: a new subtype can appear in any module at any time, the compiler never
     * complains, and {@code describeByInstanceOf} quietly returns "unsupported". Sealing this
     * hierarchy is technique 14.
     */
    interface Notification {

        String channel();
    }

    record Email(String to, String subject, String body) implements Notification {
        @Override
        public String channel() {
            return "email";
        }
    }

    record Sms(String phone, String body) implements Notification {
        @Override
        public String channel() {
            return "sms";
        }
    }

    record Push(String device, String title) implements Notification {
        @Override
        public String channel() {
            return "push";
        }
    }

    record Webhook(String url, String payload) implements Notification {
        @Override
        public String channel() {
            return "webhook";
        }
    }

    /** A subtype that the if-chain and the switch above do not know about. */
    static final class Unknown implements Notification {
        @Override
        public String channel() {
            return "unknown";
        }
    }
}
