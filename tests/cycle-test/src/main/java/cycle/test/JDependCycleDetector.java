package cycle.test;

import jdepend.framework.JavaPackage;
import jdepend.framework.JDepend;

import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

public class JDependCycleDetector {

    public static void main(String[] args) throws Exception {
        String classesDir = args.length > 0 ? args[0] : "build/classes/java/main";
        JDepend jdepend = new JDepend();
        jdepend.addDirectory(classesDir);
        jdependanalyze(jdepend);
    }

    private static void jdependanalyze(JDepend jdepend) {
        Collection<JavaPackage> packages = jdepend.analyze();

        System.out.println("=== JDepend Analysis ===");
        System.out.println("Packages analyzed: " + packages.size());
        System.out.println("Classes analyzed: " + jdepend.countClasses());

        for (JavaPackage pkg : packages) {
            System.out.println("\nPackage: " + pkg.getName());
            System.out.println("  Classes: " + pkg.getClassCount());
            System.out.println("  Coupling (afferent/efferent): " + pkg.afferentCoupling()
                    + "/" + pkg.efferentCoupling());
            System.out.println("  Instability: " + pkg.instability());
            System.out.println("  Distance from main sequence: " + pkg.distance());
        }

        System.out.println("\n--- Dependencies ---");
        for (JavaPackage pkg : packages) {
            for (Object efferentObj : pkg.getEfferents()) {
                JavaPackage efferent = (JavaPackage) efferentObj;
                System.out.println(pkg.getName() + " -> " + efferent.getName());
            }
        }

        System.out.println("\n--- Cycles ---");
        Set<String> reportedMembers = new LinkedHashSet<>();
        boolean anyCycle = false;
        for (JavaPackage pkg : packages) {
            if (!pkg.containsCycle()) {
                continue;
            }
            anyCycle = true;
            List<JavaPackage> cyclePath = new ArrayList<>();
            pkg.collectCycle(cyclePath);
            if (cyclePath.isEmpty()) {
                cyclePath.add(pkg);
            }
            System.out.print("Cycle detected:");
            for (JavaPackage member : cyclePath) {
                if (reportedMembers.add(member.getName())) {
                    System.out.print(" " + member.getName());
                }
            }
            System.out.println();
        }
        if (!anyCycle) {
            System.out.println("No cycles detected.");
        }
    }
}
