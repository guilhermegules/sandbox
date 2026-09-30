package com.example.ifalternatives.generic;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.example.ifalternatives.generic.AnnotationExample.DiscountPolicy;
import com.example.ifalternatives.generic.EnumExample.Authorization;
import com.example.ifalternatives.generic.EnumExample.Payment;
import com.example.ifalternatives.generic.EnumExample.PaymentMethodRow;
import com.example.ifalternatives.generic.PropertiesExample.RiskTier;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

class GenericOptionsTest {

    @Nested
    @DisplayName("4. Enums")
    class Enums {

        @Test
        void eachConstantCarriesItsOwnRule() {
            assertEquals(0, Payment.CARD.fee().compareTo(BigDecimal.ZERO));
            assertEquals(new BigDecimal("2.90"), Payment.PAYPAL.fee());
            assertEquals(0, Payment.BOLETO.maxAmount().compareTo(new BigDecimal("800.00")));
        }

        @Test
        void authorizesWithinTheLimit() {
            Authorization authorization = PaymentMethodRow.authorize(
                    new PaymentMethodRow("PAYPAL", new BigDecimal("250.00")));
            assertEquals("APPROVED", authorization.status());
            assertEquals(Payment.PAYPAL, authorization.payment());
        }

        @Test
        void declinesAboveTheLimit() {
            Authorization authorization = PaymentMethodRow.authorize(
                    new PaymentMethodRow("CARD", new BigDecimal("9000.00")));
            assertEquals("DECLINED", authorization.status());
        }

        @Test
        void aRenamedConstantBreaksThePersistedRow() {
            assertThrows(IllegalArgumentException.class,
                    () -> PaymentMethodRow.authorize(
                            new PaymentMethodRow("DEBIT_CARD", new BigDecimal("40.00"))));
        }
    }

    @Nested
    @DisplayName("5. Maps")
    class Maps {

        @Test
        void resolvesKnownCoupons() {
            assertEquals(new BigDecimal("0.10"), MapExample.discountFor("WELCOME10").orElseThrow());
            assertEquals(new BigDecimal("0.25"), MapExample.discountFor("BLACKFRIDAY25").orElseThrow());
            assertEquals(BigDecimal.ZERO, MapExample.discountFor("STAFF100").orElseThrow());
        }

        @Test
        void normalizesCaseAndSpaces() {
            assertEquals(new BigDecimal("0.10"), MapExample.discountFor("  welcome10 ").orElseThrow());
        }

        @Test
        void aTypoAndANullAreBothRuntimeMisses() {
            assertTrue(MapExample.discountFor("TYPO-WELCOME10").isEmpty());
            assertTrue(MapExample.discountFor(null).isEmpty());
        }
    }

    @Nested
    @DisplayName("6. Properties")
    class PropertiesFiles {

        @Test
        void readsTheBundledRules() {
            Properties bundled = PropertiesExample.load("/limits.properties");
            assertEquals(new BigDecimal("25000"), PropertiesExample.limitFor(RiskTier.HIGH, bundled));
            assertEquals(new BigDecimal("0.05"), PropertiesExample.rateFor(RiskTier.HIGH, bundled));
        }

        @Test
        void aMissingResourceIsEmptyNotNull() {
            Properties missing = PropertiesExample.load("/does-not-exist.properties");
            assertTrue(missing.isEmpty());
            assertEquals(new BigDecimal("0"), PropertiesExample.rateFor(RiskTier.HIGH, missing));
        }

        @Test
        void externalFileOverridesTheBundledRules(@TempDir Path dir) throws IOException {
            Path override = dir.resolve("limits.properties");
            Files.writeString(override, "risk.high.max=999\nrisk.high.rate=0.99\n");

            Properties properties = PropertiesExample.externalOverride(override.toString());
            assertNotNull(properties);
            assertEquals(new BigDecimal("999"), PropertiesExample.limitFor(RiskTier.HIGH, properties));
            assertEquals(new BigDecimal("0.99"), PropertiesExample.rateFor(RiskTier.HIGH, properties));
        }

        @Test
        void anOverrideLayeredOnDefaultsKeepsTheUntouchedKeys(@TempDir Path dir) throws IOException {
            Path override = dir.resolve("limits.properties");
            Files.writeString(override, "risk.high.max=999\n");

            Properties properties = PropertiesExample.externalOverride(override.toString());
            assertNotNull(properties);
            assertEquals(new BigDecimal("1000"), PropertiesExample.limitFor(RiskTier.LOW, properties));
            assertEquals(new BigDecimal("0.05"), PropertiesExample.rateFor(RiskTier.HIGH, properties));
        }

        @Test
        void noOverridePathMeansNoOverride() {
            assertNull(PropertiesExample.externalOverride(null));
        }
    }

    @Nested
    @DisplayName("7. Reflection")
    class Reflections {

        @Test
        void invokesThePolicyByName() throws ReflectiveOperationException {
            assertEquals(BigDecimal.ZERO, ReflectionExample.apply("fullDiscount", new BigDecimal("200.00")));
            assertEquals(new BigDecimal("100.00"),
                    ReflectionExample.apply("halfDiscount", new BigDecimal("200.00")));
        }

        @Test
        void aRenamedMethodFailsAtRuntime() {
            assertThrows(NoSuchMethodException.class,
                    () -> ReflectionExample.apply("full-discount", new BigDecimal("200.00")));
        }

        @Test
        void theUntypedCallSiteAcceptsTheWrongArgument() {
            assertThrows(IllegalArgumentException.class, () -> ReflectionExample.applyRaw("halfDiscount", 100));
        }

        @Test
        void theSecondLookupComesFromTheCache() throws ReflectiveOperationException {
            ReflectionExample.apply("fullDiscount", BigDecimal.ONE);
            assertEquals(BigDecimal.ZERO, ReflectionExample.apply("fullDiscount", new BigDecimal("200.00")));
        }
    }

    @Nested
    @DisplayName("8. Annotations")
    class Annotations {

        @Test
        void theScanSkipsClassesWithoutTheAnnotation() {
            Map<String, DiscountPolicy> registry = AnnotationExample.scan(
                    List.of(AnnotationExample.VipDiscount.class, AnnotationExample.NotARule.class));
            assertEquals(1, registry.size());
            assertTrue(registry.containsKey("VIP20"));
        }

        @Test
        void resolvesRulesByCode() {
            assertEquals(new BigDecimal("40.00"),
                    AnnotationExample.scan(List.of(AnnotationExample.VipDiscount.class))
                            .get("VIP20").applyTo(new BigDecimal("200.00")));
        }

        @Test
        void anUnknownCodeIsSimplyAbsent() {
            assertNull(AnnotationExample.scan(List.of(AnnotationExample.VipDiscount.class)).get("VIP99"));
        }
    }

    @Nested
    @DisplayName("9. Math")
    class Maths {

        @Test
        void bitTestGrantsOnlyTheSetFlags() {
            assertTrue(MathExample.can(0b0011, 0b0001));
            assertTrue(MathExample.can(0b0011, 0b0010));
            assertTrue(MathExample.can(0b0011, 0b0001 | 0b0010));
            assertFalse(MathExample.can(0b0001, 0b0010));
            assertFalse(MathExample.can(0, 0b0001));
        }

        @Test
        void tierIsClampedAtBothEnds() {
            assertEquals(0, MathExample.tierFor(-500));
            assertEquals(0, MathExample.tierFor(0));
            assertEquals(0, MathExample.tierFor(1200));
            assertEquals(1, MathExample.tierFor(2200));
            assertEquals(2, MathExample.tierFor(3200));
            assertEquals(3, MathExample.tierFor(4200));
            assertEquals(3, MathExample.tierFor(1_000_000));
        }

        @Test
        void surchargeComesFromTheLowestSetBit() {
            assertEquals(0, MathExample.surchargeFor(0b0001));
            assertEquals(5, MathExample.surchargeFor(0b0010));
            assertEquals(15, MathExample.surchargeFor(0b0100));
            assertEquals(40, MathExample.surchargeFor(0b1000));
        }

        @Test
        void anUnmappedFlagIsAnIndexOutOfBounds() {
            assertThrows(ArrayIndexOutOfBoundsException.class, () -> MathExample.surchargeFor(1 << 7));
        }
    }
}
