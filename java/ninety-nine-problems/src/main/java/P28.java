import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class P28 {
    static <T> List<List<T>> lsort(List<List<T>> list) {
        List<List<T>> sorted = new ArrayList<>(list);
        sorted.sort(Comparator.comparingInt(List::size));
        return sorted;
    }

    static <T> List<List<T>> lfsort(List<List<T>> list) {
        Map<Integer, Integer> frequency = new HashMap<>();
        for (var sublist : list) {
            frequency.merge(sublist.size(), 1, Integer::sum);
        }
        List<List<T>> sorted = new ArrayList<>(list);
        sorted.sort(Comparator.comparingInt((List<T> sublist) -> frequency.get(sublist.size())));
        return sorted;
    }
}