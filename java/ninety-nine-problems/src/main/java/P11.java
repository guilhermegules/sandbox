import java.util.ArrayList;
import java.util.List;

public class P11 {
    static <T> List<Object> encodeModified(List<T> list) {
        List<Object> encoded = new ArrayList<>();
        for (var consecutive : P9.pack(list)) {
            var run = Run.of(consecutive);
            encoded.add(run.count() == 1 ? run.element() : run);
        }
        return encoded;
    }
}