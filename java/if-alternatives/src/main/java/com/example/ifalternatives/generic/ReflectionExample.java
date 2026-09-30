package com.example.ifalternatives.generic;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Technique 7 - Reflection: the branch is a method name in a {@code String}, resolved at runtime.
 *
 * <p>PROS: generic - one call site can drive any number of rules loaded from config or a database.
 *
 * <p>CONS: slower, obscure, and complex - you need a cache ({@link #CACHE}) because scanning
 * {@code getDeclaredMethods()} on every call is expensive. The dangerous part is that the string is
 * never checked by the compiler: rename a method and the code still compiles, then fails at
 * runtime with {@link NoSuchMethodException}. The demo below does exactly that rename.
 */
public class ReflectionExample {

    /** Without this cache every call re-scans the class metadata. */
    private static final Map<String, Method> CACHE = new ConcurrentHashMap<>();

    private static final List<String> CONFIGURED = List.of(
            "fullDiscount",
            "halfDiscount",
            "full-discount",
            "half-discount");

    public static void demo() {
        System.out.println("policy name comes from config, the call site never changes:");
        for (String configured : CONFIGURED) {
            String outcome;
            try {
                outcome = apply(configured, new BigDecimal("200.00")).toPlainString();
            } catch (ReflectiveOperationException e) {
                Throwable cause = e instanceof InvocationTargetException ite ? ite.getCause() : e;
                outcome = cause.getClass().getSimpleName() + ": " + cause.getMessage();
            }
            System.out.printf("  %-18s -> %s%n", configured, outcome);
        }
        System.out.println("  'full-discount' is the post-rename name: compiles, explodes at runtime");

        System.out.println("  and the untyped call site accepts the wrong argument:");
        try {
            Object wrong = applyRaw("halfDiscount", 100);
            System.out.println("  halfDiscount(100) -> " + wrong);
        } catch (ReflectiveOperationException | IllegalArgumentException e) {
            System.out.println("  halfDiscount(100) -> " + e.getClass().getSimpleName() + ": " + e.getMessage());
        }
    }

    /** Applies a policy by name. Only the name is dynamic - the amount stays strongly typed. */
    static BigDecimal apply(String policyName, BigDecimal total) throws ReflectiveOperationException {
        return (BigDecimal) resolve(policyName).invoke(null, total);
    }

    /** The untyped entry point, where an argument mismatch becomes an {@link IllegalArgumentException}. */
    static Object applyRaw(String policyName, Object... args) throws ReflectiveOperationException {
        return resolve(policyName).invoke(null, args);
    }

    private static Method resolve(String policyName) throws NoSuchMethodException {
        Method cached = CACHE.get(policyName);
        if (cached != null) {
            return cached;
        }
        Method found = lookup(policyName);
        CACHE.put(policyName, found);
        return found;
    }

    private static Method lookup(String policyName) throws NoSuchMethodException {
        for (Method method : ReflectionExample.class.getDeclaredMethods()) {
            if (method.getName().equals(policyName)) {
                return method;
            }
        }
        throw new NoSuchMethodException("No policy named " + policyName);
    }

    public static BigDecimal fullDiscount(BigDecimal total) {
        return BigDecimal.ZERO;
    }

    public static BigDecimal halfDiscount(BigDecimal total) {
        return total.divide(new BigDecimal("2")).setScale(2, RoundingMode.HALF_UP);
    }

    public static BigDecimal noDiscount(BigDecimal total) {
        return BigDecimal.ZERO;
    }
}
