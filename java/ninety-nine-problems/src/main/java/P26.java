import java.util.ArrayList;
import java.util.List;

public class P26 {
    static <T> List<List<T>> combination(int k, List<T> list) {
        if (k < 0 || k > list.size()) {
            throw new IllegalArgumentException("k out of range: " + k);
        }
        List<List<Integer>> choices = new ArrayList<>();
        collectIndices(list.size(), k, 0, new ArrayList<>(), choices);

        List<List<T>> combinations = new ArrayList<>(choices.size());
        for (var indices : choices) {
            combinations.add(pick(list, indices));
        }
        return combinations;
    }

    static <T> List<T> pick(List<T> list, List<Integer> indices) {
        List<T> picked = new ArrayList<>(indices.size());
        for (var index : indices) {
            picked.add(list.get(index));
        }
        return picked;
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
}