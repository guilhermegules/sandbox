import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class P8 {
    static <T> List<T> compress(List<T> list) {
        List<T> compressed = new ArrayList<>();
        for (var element : list) {
            if (compressed.isEmpty() || !Objects.equals(compressed.getLast(), element)) {
                compressed.add(element);
            }
        }
        return compressed;
    }
}