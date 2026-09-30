package com.example.ifalternatives.generic;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Properties;

/**
 * Technique 6 - Properties: the rules leave the code and move to a file.
 *
 * <p>PROS: generic, the code stops changing when a business rate changes - ops can ship a fix
 * without a deploy.
 *
 * <p>CONS: the code now depends on the disk. A resource inside a jar is immutable, so a library
 * that ships its own {@code limits.properties} cannot be tuned by the consumer, and a missing or
 * misspelled key returns {@code null} from {@link Properties#getProperty(String)} instead of
 * failing the build. Always keep a hardcoded default.
 *
 * <p>Run with an override: {@code mvn exec:java -Difalternatives.limits=/tmp/limits.properties}
 */
public class PropertiesExample {

    static final String OVERRIDE_PROPERTY = "ifalternatives.limits";
    private static final String RESOURCE = "/limits.properties";

    private static final List<RiskTier> TIERS = List.of(RiskTier.LOW, RiskTier.MEDIUM, RiskTier.HIGH);

    public static void demo() {
        Properties bundled = load(RESOURCE);
        System.out.println("rules loaded from " + RESOURCE + " (inside target/classes, later inside the jar):");
        printLimits(bundled);

        Properties override = externalOverride(System.getProperty(OVERRIDE_PROPERTY));
        if (override != null) {
            System.out.println("  external override in effect (" + System.getProperty(OVERRIDE_PROPERTY) + "):");
            printLimits(override);
        } else {
            System.out.println("  no external override set (" + OVERRIDE_PROPERTY + " unset) -> bundled rules win");
        }

        Properties missing = new Properties();
        System.out.println("  key that does not exist: " + rateFor(RiskTier.HIGH, missing)
                + "  <- silent null path is the con in one line");
    }

    static void printLimits(Properties rules) {
        for (RiskTier tier : TIERS) {
            System.out.printf("  %-7s max=%-8s rate=%s%n",
                    tier, limitFor(tier, rules), rateFor(tier, rules));
        }
    }

    /** Load a properties resource, or an empty one - never null, so callers cannot NPE here. */
    static Properties load(String resource) {
        Properties properties = new Properties();
        try (InputStream in = PropertiesExample.class.getResourceAsStream(resource)) {
            if (in != null) {
                properties.load(in);
            }
        } catch (IOException e) {
            throw new IllegalStateException("Cannot read " + resource, e);
        }
        return properties;
    }

    /**
     * The escape hatch that makes properties files usable from a packaged app: the external file is
     * layered on top of the bundled defaults, never on top of nothing. An override that replaces the
     * whole set would silently zero every key the operator forgot to copy.
     */
    static Properties externalOverride(String path) {
        if (path == null) {
            return null;
        }
        Properties properties = load(RESOURCE);
        try (InputStream in = Files.newInputStream(Path.of(path))) {
            properties.load(in);
            return properties;
        } catch (IOException e) {
            throw new IllegalStateException("Cannot read override " + path, e);
        }
    }

    static BigDecimal limitFor(RiskTier tier, Properties rules) {
        return new BigDecimal(rules.getProperty("risk." + tier.name().toLowerCase() + ".max", "0"));
    }

    static BigDecimal rateFor(RiskTier tier, Properties rules) {
        return new BigDecimal(rules.getProperty("risk." + tier.name().toLowerCase() + ".rate", "0"));
    }

    enum RiskTier {
        LOW,
        MEDIUM,
        HIGH
    }
}
