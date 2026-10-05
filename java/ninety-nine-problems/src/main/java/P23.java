import java.util.ArrayList;
import java.util.List;
import java.util.random.RandomGenerator;

public class P23 {
    static <T> List<T> rndSelect(List<T> list, int count) {
        if (count < 0 || count > list.size()) {
            throw new IllegalArgumentException("count out of range: " + count);
        }
        var random = RandomGenerator.getDefault();
        List<T> pool = new ArrayList<>(list);
        List<T> selected = new ArrayList<>(count);
        for (var i = 0; i < count; i++) {
            var removal = P20.removeAt(pool, random.nextInt(pool.size()) + 1);
            pool = removal.list();
            selected.add(removal.element());
        }
        return selected;
    }
}