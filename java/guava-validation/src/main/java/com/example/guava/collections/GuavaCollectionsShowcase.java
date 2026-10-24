package com.example.guava.collections;

import com.google.common.collect.*;

import java.util.List;

public class GuavaCollectionsShowcase {

    /**
     * Multimap: Maps a single key to multiple values without nested Map<K, List<V>> boilerplate.
     */
    public Multimap<String, String> demonstrateMultimap() {
        ListMultimap<String, String> departmentMembers = ArrayListMultimap.create();
        departmentMembers.put("Engineering", "Alice");
        departmentMembers.put("Engineering", "Bob");
        departmentMembers.put("Engineering", "Charlie");
        departmentMembers.put("Marketing", "Diana");
        departmentMembers.put("Marketing", "Evan");
        return departmentMembers;
    }

    /**
     * BiMap: Bi-directional map maintaining unique values and inverted lookup.
     */
    public BiMap<String, String> demonstrateBiMap() {
        BiMap<String, String> userIdToEmail = HashBiMap.create();
        userIdToEmail.put("USR-001", "alice@example.com");
        userIdToEmail.put("USR-002", "bob@example.com");
        return userIdToEmail;
    }

    /**
     * Table: 2D data structure mapping (Row, Column) -> Value.
     */
    public Table<String, String, Double> demonstrateTable() {
        Table<String, String, Double> gradeSheet = HashBasedTable.create();
        gradeSheet.put("Alice", "Math", 95.5);
        gradeSheet.put("Alice", "Physics", 88.0);
        gradeSheet.put("Bob", "Math", 72.0);
        gradeSheet.put("Bob", "History", 91.0);
        return gradeSheet;
    }

    /**
     * Multiset: Collection that keeps track of the frequency of elements (bag).
     */
    public Multiset<String> demonstrateMultiset(List<String> words) {
        Multiset<String> wordCounts = HashMultiset.create();
        wordCounts.addAll(words);
        return wordCounts;
    }
}
