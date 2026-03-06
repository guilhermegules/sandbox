public class Partlist {
    public static String[][] partlist(String[] arr) {
      int n = arr.length - 1;
      String[][] partlist = new String[n][2]; 
      
      for (int i = 1; i <= n; i++) {
        StringBuilder left = new StringBuilder();
        for (int j = 0; j < i; j++) {
          if (left.length() > 0) {
            left.append(" ");
          }
          left.append(arr[j]);
        }
        StringBuilder right = new StringBuilder();
        for (int g = i; g <= n; g++) {
          if (right.length() > 0) {
            right.append(" ");
          }
          right.append(arr[g]);
        }
        partlist[i - 1][0] = left.toString();
        partlist[i - 1][1] = right.toString();
      }
      
      return partlist;
    }
}
