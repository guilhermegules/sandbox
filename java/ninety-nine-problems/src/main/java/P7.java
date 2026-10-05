import java.util.ArrayList;
import java.util.List;

public class P7 {
    static List<Object> myFlatten(List<?> list) {
        List<Object> flat = new ArrayList<>();
        for (var element : list) {
            if (element instanceof List<?> nested) {
                flat.addAll(myFlatten(nested));
            } else {
                flat.add(element);
            }
        }
        return flat;
    }
}