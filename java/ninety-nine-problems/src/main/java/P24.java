import java.util.List;

public class P24 {
    static List<Integer> rndSelect(int count, int maxNumber) {
        return P23.rndSelect(P22.range(1, maxNumber), count);
    }
}