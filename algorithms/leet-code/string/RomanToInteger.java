class Solution {
    private final HashMap<String, Integer> romanToInt = new HashMap<String, Integer>();

    public Solution() {
        this.startRomanMap();
    }

    public int romanToInt(String s) {
        String previousValue = s.split("")[0];
        int sum = 0;

        for (String n : s.split("")) {
            int romanValue = romanToInt.get(n);
            int previousIntValue = romanToInt.get(previousValue);

            sum += romanValue;

            if (romanValue > previousIntValue) {
                sum -= 2 * previousIntValue;
            }

            previousValue = n;
        }

        return sum;
    }

    private void startRomanMap() {
        this.romanToInt.put("I", 1);
        this.romanToInt.put("V", 5);
        this.romanToInt.put("X", 10);
        this.romanToInt.put("L", 50);
        this.romanToInt.put("C", 100);
        this.romanToInt.put("D", 500);
        this.romanToInt.put("M", 1000);
    }
}
