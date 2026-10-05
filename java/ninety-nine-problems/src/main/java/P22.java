import java.util.ArrayList;
import java.util.List;

public class P22 {
    static List<Integer> range(int from, int to) {
        List<Integer> range = new ArrayList<>();
        for (var value = from; value <= to; value++) {
            range.add(value);
        }
        return range;
    }
}