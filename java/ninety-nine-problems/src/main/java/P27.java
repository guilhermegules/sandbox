import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

public class P27 {
    record Group3<T>(List<T> first, List<T> second, List<T> third) {}

    static <T> List<Group3<T>> group3(List<T> list) {
        List<Group3<T>> groupings = new ArrayList<>();
        for (var groups : group(list, List.of(2, 3, 4))) {
            groupings.add(new Group3<>(groups.get(0), groups.get(1), groups.get(2)));
        }
        return groupings;
    }

    static <T> List<List<List<T>>> group(List<T> list, List<Integer> sizes) {
        var total = 0;
        for (var size : sizes) {
            if (size < 0) {
                throw new IllegalArgumentException("group sizes must not be negative: " + sizes);
            }
            total += size;
        }
        if (total != list.size()) {
            throw new IllegalArgumentException("group sizes " + sizes + " do not add up to " + list.size());
        }
        List<List<List<T>>> groupings = new ArrayList<>();
        collectGroups(list, sizes, 0, new ArrayList<>(), groupings);
        return groupings;
    }

    private static <T> void collectGroups(List<T> remaining, List<Integer> sizes, int index, List<List<T>> current,
            List<List<List<T>>> groupings) {
        if (index == sizes.size()) {
            groupings.add(current.stream().map(List::copyOf).toList());
            return;
        }
        var size = sizes.get(index);
        for (var indices : indexCombinations(remaining.size(), size)) {
            current.add(P26.pick(remaining, indices));
            collectGroups(without(remaining, indices), sizes, index + 1, current, groupings);
            current.removeLast();
        }
    }

    private static List<List<Integer>> indexCombinations(int size, int k) {
        List<List<Integer>> choices = new ArrayList<>();
        collectIndices(size, k, 0, new ArrayList<>(), choices);
        return choices;
    }

    private static void collectIndices(int size, int k, int start, List<Integer> current, List<List<Integer>> choices) {
        if (current.size() == k) {
            choices.add(List.copyOf(current));
            return;
        }
        for (var index = start; index < size; index++) {
            current.add(index);
            collectIndices(size, k, index + 1, current, choices);
            current.removeLast();
        }
    }

    private static <T> List<T> without(List<T> list, List<Integer> indices) {
        var removed = new HashSet<>(indices);
        List<T> kept = new ArrayList<>(list.size() - indices.size());
        for (var index = 0; index < list.size(); index++) {
            if (!removed.contains(index)) {
                kept.add(list.get(index));
            }
        }
        return kept;
    }
}