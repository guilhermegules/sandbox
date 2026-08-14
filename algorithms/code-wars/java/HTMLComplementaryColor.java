public class HTMLComplementaryColor {
  public static String getReversedColor(String hexColor) {
    if (!(hexColor instanceof String)) throw new IllegalArgumentException();
    if (hexColor.equals("") || hexColor.equals("0")) return "#FFFFFF";
    if (hexColor.length() >= 7) throw new IllegalArgumentException();
    if (hasNonHex(hexColor)) throw new IllegalArgumentException();
    
    String hex = String.format("%6s", hexColor).replace(' ', '0');
    
    int r = Integer.parseInt(hex.substring(0, 2), 16);
    int g = Integer.parseInt(hex.substring(2, 4), 16);
    int b = Integer.parseInt(hex.substring(4, 6), 16);
    
    r = 255 - r;
    g = 255 - g;
    b = 255 - b;
    
    return String.format("#%02X%02X%02X", r, g, b);
  }
  
  private static boolean hasNonHex(String str) {
    return !str.matches("[0-9a-fA-F]+");
  }
}
