import java.util.ArrayList;
import java.util.List;

public class P19 {
    static <T> List<T> rotate(List<T> list, int places) {
        if (list.isEmpty()) {
            return List.of();
        }
        var split = P17.split(list, Math.floorMod(places, list.size()));
        List<T> rotated = new ArrayList<>(split.suffix());
        rotated.addAll(split.prefix());
        return rotated;
    }
}