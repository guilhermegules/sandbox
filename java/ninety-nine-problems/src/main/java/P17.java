import java.util.ArrayList;
import java.util.List;

public class P17 {
    record Split<T>(List<T> prefix, List<T> suffix) {}

    static <T> Split<T> split(List<T> list, int length) {
        if (length < 0 || length > list.size()) {
            throw new IllegalArgumentException("length out of range: " + length);
        }
        List<T> prefix = new ArrayList<>();
        List<T> suffix = new ArrayList<>();
        for (var index = 0; index < list.size(); index++) {
            if (index < length) {
                prefix.add(list.get(index));
            } else {
                suffix.add(list.get(index));
            }
        }
        return new Split<>(List.copyOf(prefix), List.copyOf(suffix));
    }
}