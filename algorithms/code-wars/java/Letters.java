public class Letters {
  public static String search(String line){
    line = line.toLowerCase();
    StringBuilder result = new StringBuilder();
    
    for (char letter = 'a'; letter <= 'z'; letter++) {
        if (line.indexOf(letter) != -1) {
            result.append('1');
        } else {
            result.append('0');
        }
    }

    return result.toString();
  }
}
