package cycle.test;

import com.tngtech.archunit.core.domain.JavaClass;
import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class ArchUnitCycleTest {

    private static final String CLASSES_DIR = "build/classes/java/main";

    private JavaClasses importProjectClasses() {
        return new ClassFileImporter().importPath(CLASSES_DIR);
    }

    @Test
    public void shouldDetectCircularDependencyBetweenOrderAndCustomer() {
        JavaClasses javaClasses = importProjectClasses();

        Set<com.tngtech.archunit.core.domain.Dependency> orderDeps =
                javaClasses.get(OrderService.class).getDirectDependenciesFromSelf();
        Set<com.tngtech.archunit.core.domain.Dependency> customerDeps =
                javaClasses.get(CustomerService.class).getDirectDependenciesFromSelf();

        boolean orderDependsOnCustomer = orderDeps.stream()
                .anyMatch(d -> d.getTargetClass().getName().equals(CustomerService.class.getName()));
        boolean customerDependsOnOrder = customerDeps.stream()
                .anyMatch(d -> d.getTargetClass().getName().equals(OrderService.class.getName()));

        assertTrue(orderDependsOnCustomer,
                "OrderService should depend on CustomerService");
        assertTrue(customerDependsOnOrder,
                "CustomerService should depend on OrderService");
        System.out.println("Circular dependency detected: OrderService <-> CustomerService");
    }

    @Test
    public void shouldDetectClassesWithHighCoupling() {
        JavaClasses javaClasses = importProjectClasses();

        System.out.println("Classes with high coupling:");
        int matching = 0;
        for (JavaClass javaClass : javaClasses) {
            int outgoing = javaClass.getDirectDependenciesFromSelf().size();
            int incoming = javaClass.getDirectDependenciesToSelf().size();
            if (outgoing > 1 && incoming > 1) {
                matching++;
                System.out.println("  " + javaClass.getSimpleName()
                        + " (outgoing: " + outgoing + ", incoming: " + incoming + ")");
            }
        }
        System.out.println("Classes with high coupling: " + matching);
    }
}
