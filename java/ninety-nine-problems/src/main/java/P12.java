import java.util.ArrayList;
import java.util.List;

public class P12 {
    static List<Object> decode(List<?> encoded) {
        List<Object> decoded = new ArrayList<>();
        for (var term : encoded) {
            if (term instanceof Run<?> run) {
                for (var i = 0; i < run.count(); i++) {
                    decoded.add(run.element());
                }
            } else {
                decoded.add(term);
            }
        }
        return decoded;
    }
}