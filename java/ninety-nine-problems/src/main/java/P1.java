import java.util.List;

public class P1 {
    static String lastElement(List<String> list) {
        var size = list.size();
        var lastIndex = size - 1;
        return list.get(lastIndex);
    }
}
