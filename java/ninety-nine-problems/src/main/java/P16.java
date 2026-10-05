import java.util.ArrayList;
import java.util.List;

public class P16 {
    static <T> List<T> drop(List<T> list, int nth) {
        if (nth < 1) {
            throw new IllegalArgumentException("nth must be at least 1: " + nth);
        }
        List<T> kept = new ArrayList<>();
        for (var index = 0; index < list.size(); index++) {
            if ((index + 1) % nth != 0) {
                kept.add(list.get(index));
            }
        }
        return kept;
    }
}