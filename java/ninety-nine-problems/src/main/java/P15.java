import java.util.ArrayList;
import java.util.List;

public class P15 {
    static <T> List<T> dupli(List<T> list, int times) {
        if (times < 0) {
            throw new IllegalArgumentException("times must not be negative: " + times);
        }
        List<T> duplicated = new ArrayList<>(list.size() * times);
        for (var element : list) {
            for (var i = 0; i < times; i++) {
                duplicated.add(element);
            }
        }
        return duplicated;
    }
}