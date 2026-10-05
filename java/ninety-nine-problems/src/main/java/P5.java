import java.util.ArrayList;
import java.util.List;

public class P5 {
    List<String> reverse(List<String> list) {
        List<String> reversed = new ArrayList<>();
        for (int i = list.size() - 1; i > 0; i--) {
            reversed.add(list.get(i));
        }
        return reversed;
    }
}
