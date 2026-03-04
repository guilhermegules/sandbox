public class Solution {
    public static int candles(int candlesNumber, int makeNew) {
        var leftovers = 0;
        var burnedCandles = 0;
      
        while (candlesNumber > 0) {
          burnedCandles++;
          candlesNumber--;
          leftovers++;
          
          if (leftovers >= makeNew) {
            candlesNumber++;
            leftovers -= makeNew;
          }
        }
      
        return burnedCandles; 
    }
}
