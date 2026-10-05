import java.util.List;

public class P25 {
    static <T> List<T> rndPermu(List<T> list) {
        return P23.rndSelect(list, list.size());
    }
}