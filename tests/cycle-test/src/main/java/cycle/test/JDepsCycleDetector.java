package cycle.test;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.Set;
import java.util.TreeMap;
import java.util.TreeSet;

public class JDepsCycleDetector {

    public static void main(String[] args) throws IOException, InterruptedException {
        Path classDir = Paths.get(args.length > 0 ? args[0] : "build/classes/java/main").toAbsolutePath();
        if (!Files.exists(classDir)) {
            System.out.println("Class directory not found: " + classDir);
            return;
        }

        System.out.println("=== JDeps Analysis ===");
        System.out.println("Analyzing: " + classDir);

        String jdeps = Paths.get(System.getProperty("java.home"), "bin", "jdeps").toString();
        List<String> command = Arrays.asList(jdeps, "-verbose:class", "-filter:none", classDir.toString());

        Process process = new ProcessBuilder(command).redirectErrorStream(true).start();
        List<String> lines = new ArrayList<>();
        try (Scanner scanner = new Scanner(process.getInputStream())) {
            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                lines.add(line);
                System.out.println(line);
            }
        }
        if (process.waitFor() != 0) {
            System.err.println("jdeps exited with code " + process.exitValue());
            return;
        }

        Map<String, Set<String>> dependencies = parseDependencies(lines);

        System.out.println("\n--- Internal dependencies ---");
        for (Map.Entry<String, Set<String>> entry : dependencies.entrySet()) {
            for (String target : entry.getValue()) {
                System.out.println(entry.getKey() + " -> " + target);
            }
        }

        System.out.println("\n--- Potential cycles (reciprocal dependencies) ---");
        Set<String> reported = new TreeSet<>();
        boolean anyCycle = false;
        for (Map.Entry<String, Set<String>> entry : dependencies.entrySet()) {
            for (String target : entry.getValue()) {
                String pair = entry.getKey().compareTo(target) < 0
                        ? entry.getKey() + " <-> " + target
                        : target + " <-> " + entry.getKey();
                if (dependencies.getOrDefault(target, Collections.emptySet()).contains(entry.getKey())
                        && reported.add(pair)) {
                    anyCycle = true;
                    System.out.println(pair);
                }
            }
        }
        if (!anyCycle) {
            System.out.println("No cycles detected.");
        }
    }

    private static Map<String, Set<String>> parseDependencies(List<String> lines) {
        Map<String, Set<String>> dependencies = new TreeMap<>();
        for (String line : lines) {
            int arrow = line.indexOf("->");
            if (arrow < 0) {
                continue;
            }
            String from = line.substring(0, arrow).trim();
            String rest = line.substring(arrow + 2).trim();
            int space = rest.indexOf(' ');
            String to = space >= 0 ? rest.substring(0, space).trim() : rest.trim();
            if (!from.contains("cycle.test") || !to.contains("cycle.test")) {
                continue;
            }
            if (!dependencies.containsKey(from)) {
                dependencies.put(from, new TreeSet<String>());
            }
            dependencies.get(from).add(to);
        }
        return dependencies;
    }
}
