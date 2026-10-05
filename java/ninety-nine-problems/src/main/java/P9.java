import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class P9 {
    static <T> List<List<T>> pack(List<T> list) {
        List<List<T>> packed = new ArrayList<>();
        List<T> current = new ArrayList<>();
        for (var element : list) {
            if (!current.isEmpty() && !Objects.equals(current.getFirst(), element)) {
                packed.add(List.copyOf(current));
                current = new ArrayList<>();
            }
            current.add(element);
        }
        if (!current.isEmpty()) {
            packed.add(List.copyOf(current));
        }
        return packed;
    }
}