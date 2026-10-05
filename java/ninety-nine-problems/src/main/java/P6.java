import java.util.List;
import java.util.Objects;

public class P6 {
    static boolean isPalindrome(List<?> list) {
        var left = 0;
        var right = list.size() - 1;
        while (left < right) {
            if (!Objects.equals(list.get(left), list.get(right))) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}