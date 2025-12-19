// https://www.hackerrank.com/challenges/two-strings/problem?isFullScreen=true&h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=dictionaries-hashmaps
class Result {
    public static String twoStrings(String s1, String s2) {
        long contains = 0;
        Set<Character> s1Set = new HashSet<>();
        Set<Character> s2Set = new HashSet<>();

        for (int i = 0; i < s1.length(); i++) {
            s1Set.add(s1.charAt(i));
        }
        
        for (int i = 0; i < s2.length(); i++) {
            s2Set.add(s2.charAt(i));
        }
        
        for(char s1Char : s1Set) {
            for(char s2Char : s2Set) {
                if(s1Char == s2Char) {
                    contains++;
                }
            }
        }
        
        return contains > 0 ? "YES" : "NO";
    }
}
