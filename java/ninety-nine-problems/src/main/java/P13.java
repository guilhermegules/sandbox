import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class P13 {
    static <T> List<Object> encodeDirect(List<T> list) {
        List<Object> encoded = new ArrayList<>();
        var index = 0;
        while (index < list.size()) {
            var current = list.get(index);
            var count = 1;
            while (index + count < list.size() && Objects.equals(list.get(index + count), current)) {
                count++;
            }
            encoded.add(count == 1 ? current : new Run<>(count, current));
            index += count;
        }
        return encoded;
    }
}