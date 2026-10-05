import java.util.List;

public class P18 {
    static <T> List<T> slice(List<T> list, int from, int to) {
        if (from < 1 || to > list.size() || from > to) {
            throw new IllegalArgumentException("slice bounds out of range: " + from + ".." + to);
        }
        return List.copyOf(list.subList(from - 1, to));
    }
}