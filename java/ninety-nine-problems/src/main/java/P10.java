import java.util.ArrayList;
import java.util.List;

public class P10 {
    static <T> List<Object> encode(List<T> list) {
        List<Object> encoded = new ArrayList<>();
        for (var run : P9.pack(list)) {
            encoded.add(Run.of(run));
        }
        return encoded;
    }
}