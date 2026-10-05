import java.util.ArrayList;
import java.util.List;

public class P21 {
    static <T> List<T> insertAt(T element, List<T> list, int position) {
        if (position < 1 || position > list.size() + 1) {
            throw new IllegalArgumentException("position out of range: " + position);
        }
        List<T> result = new ArrayList<>(list);
        result.add(position - 1, element);
        return result;
    }
}