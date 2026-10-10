package com.example.ifalternatives.polymorphism;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.example.ifalternatives.polymorphism.InstanceOfExample.Email;
import com.example.ifalternatives.polymorphism.InstanceOfExample.Notification;
import com.example.ifalternatives.polymorphism.InstanceOfExample.Push;
import com.example.ifalternatives.polymorphism.InstanceOfExample.Sms;
import com.example.ifalternatives.polymorphism.InstanceOfExample.Unknown;
import com.example.ifalternatives.polymorphism.InstanceOfExample.Webhook;
import com.example.ifalternatives.polymorphism.PolymorphismExample.International;
import com.example.ifalternatives.polymorphism.PolymorphismExample.Local;
import com.example.ifalternatives.polymorphism.PolymorphismExample.National;
import com.example.ifalternatives.polymorphism.PolymorphismExample.Parcel;
import com.example.ifalternatives.polymorphism.PolymorphismExample.Quote;
import com.example.ifalternatives.polymorphism.PolymorphismExample.Shipping;
import java.math.BigDecimal;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class PolymorphismTest {

    private static final List<Notification> NOTIFICATIONS = List.of(
            new Email("guilherme@example.com", "receipt", "Your invoice is ready"),
            new Sms("+351912345678", "Your code is 4821"),
            new Push("device-7f2a", "Order shipped"),
            new Webhook("https://partner.example.com/hooks", "{\"event\":\"order.shipped\"}"));

    @Nested
    @DisplayName("13. Reflection and InstanceOf")
    class InstanceOfDispatch {

        @Test
        void theIfChainAndTheSwitchAgreeOnEveryKnownType() {
            for (Notification notification : NOTIFICATIONS) {
                assertEquals(InstanceOfExample.describeByInstanceOf(notification),
                        InstanceOfExample.describeBySwitch(notification),
                        "dispatch disagrees for " + notification.channel());
            }
        }

        @Test
        void eachTypeRoutesToItsOwnChannel() {
            assertEquals("smtp -> guilherme@example.com", InstanceOfExample.describeBySwitch(NOTIFICATIONS.get(0)));
            assertEquals("gateway -> +351912345678", InstanceOfExample.describeBySwitch(NOTIFICATIONS.get(1)));
            assertEquals("fcm -> device-7f2a", InstanceOfExample.describeBySwitch(NOTIFICATIONS.get(2)));
            assertEquals("http -> https://partner.example.com/hooks",
                    InstanceOfExample.describeBySwitch(NOTIFICATIONS.get(3)));
        }

        @Test
        void recordPatternsReadThePayloadWithoutACast() {
            assertEquals("smtp -> guilherme@example.com (21 chars)",
                    InstanceOfExample.routeWithPattern(NOTIFICATIONS.get(0)));
            assertEquals("gateway -> +351912345678 (Your code is 4821)",
                    InstanceOfExample.routeWithPattern(NOTIFICATIONS.get(1)));
        }

        @Test
        void anUnhandledSubtypeFallsThroughTheDefault() {
            Notification unknown = new Unknown();
            assertEquals("unsupported", InstanceOfExample.describeByInstanceOf(unknown));
            assertEquals("unsupported", InstanceOfExample.describeBySwitch(unknown));
            assertEquals("unsupported", InstanceOfExample.routeWithPattern(unknown));
        }
    }

    @Nested
    @DisplayName("14. Type System + Polymorphism")
    class TypeSystemPolymorphism {

        @Test
        void theFactoryTranslatesTheCarrierCodeIntoAType() {
            assertInstanceOf(Local.class, PolymorphismExample.of("LOCAL"));
            assertInstanceOf(National.class, PolymorphismExample.of("NATIONAL"));
            assertInstanceOf(International.class, PolymorphismExample.of("INTERNATIONAL"));
        }

        @Test
        void anUnknownCarrierFailsFast() {
            IllegalArgumentException error =
                    assertThrows(IllegalArgumentException.class, () -> PolymorphismExample.of("DRONE"));
            assertEquals("Unknown carrier: DRONE", error.getMessage());
        }

        @Test
        void eachSubtypeQuotesItself() {
            Parcel light = new Parcel(new BigDecimal("0.8"), new BigDecimal("40.00"), false);
            assertEquals(new BigDecimal("5.54"), PolymorphismExample.of("LOCAL").quote(light).amount());
            assertEquals(new BigDecimal("13.46"), PolymorphismExample.of("NATIONAL").quote(light).amount());
            assertEquals(new BigDecimal("43.50"), PolymorphismExample.of("INTERNATIONAL").quote(light).amount());
        }

        @Test
        void slaComesFromTheSubtypeToo() {
            assertEquals(1, PolymorphismExample.of("LOCAL").quote(parcel()).days());
            assertEquals(3, PolymorphismExample.of("NATIONAL").quote(parcel()).days());
            assertEquals(8, PolymorphismExample.of("INTERNATIONAL").quote(parcel()).days());
        }

        @Test
        void customsOnlyAppliesAboveTheDeclaredValueThreshold() {
            Parcel cheap = new Parcel(new BigDecimal("0.4"), new BigDecimal("120.00"), false);
            Parcel expensive = new Parcel(new BigDecimal("0.4"), new BigDecimal("1200.00"), false);
            International carrier = new International();

            assertEquals(new BigDecimal("41.70"), carrier.quote(cheap).amount());
            assertEquals(new BigDecimal("53.70"), carrier.quote(expensive).amount());
        }

        @Test
        void consumersSwitchOverTheClosedSet() {
            assertEquals("LocalPost handles 20kg, 1 day(s)",
                    PolymorphismExample.slaReport(new Local()));
            assertEquals("NationalExpress guarantees 3 day(s) inside the country",
                    PolymorphismExample.slaReport(new National()));
            assertEquals("GlobalAir takes 8 day(s) and adds customs above EUR 500",
                    PolymorphismExample.slaReport(new International()));
        }

        private Parcel parcel() {
            return new Parcel(new BigDecimal("1.0"), new BigDecimal("50.00"), false);
        }
    }
}
