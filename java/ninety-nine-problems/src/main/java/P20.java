import java.util.ArrayList;
import java.util.List;

public class P20 {
    record Removal<T>(T element, List<T> list) {}

    static <T> Removal<T> removeAt(List<T> list, int position) {
        if (position < 1 || position > list.size()) {
            throw new IllegalArgumentException("position out of range: " + position);
        }
        List<T> remaining = new ArrayList<>(list);
        var element = remaining.remove(position - 1);
        return new Removal<>(element, List.copyOf(remaining));
    }
}