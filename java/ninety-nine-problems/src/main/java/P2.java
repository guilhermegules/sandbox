import java.util.List;

public class P2 {
    static String findLastElementWith(String element, List<String> list) {
        var filtered = list.stream().filter(e -> e.equalsIgnoreCase(element)).toList();
        if (filtered.isEmpty()) return "";
        return P1.lastElement(filtered);
    }
}
