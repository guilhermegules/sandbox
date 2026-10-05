import java.util.List;

void main() {
    var letters = List.of("a", "b", "c", "d", "e", "f", "g", "h", "i", "k");
    var withDuplicates = List.of("a", "a", "a", "a", "b", "c", "c", "a", "a", "d", "e", "e", "e", "e");

    System.out.println("P01 " + P1.lastElement(List.of("a", "b", "c", "d")));
    System.out.println("P02 " + P2.findLastElementWith("a", letters));
    System.out.println("P02 " + P2.findLastElementWith("e", letters));
    System.out.println("P03 " + P3.elementAt(0, letters));
    System.out.println("P04 " + P4.count(letters));
    System.out.println("P05 " + new P5().reverse(List.of("a", "b", "c", "d")));
    System.out.println("P06 " + P6.isPalindrome(List.of("x", "a", "m", "a", "x")));
    System.out.println("P06 " + P6.isPalindrome(withDuplicates));
    System.out.println("P07 " + P7.myFlatten(List.of("a", List.of("b", List.of("c", "d"), "e"))));
    System.out.println("P08 " + P8.compress(withDuplicates));
    System.out.println("P09 " + P9.pack(withDuplicates));
    System.out.println("P10 " + P10.encode(withDuplicates));
    System.out.println("P11 " + P11.encodeModified(withDuplicates));
    System.out.println("P12 " + P12.decode(P11.encodeModified(withDuplicates)));
    System.out.println("P12 " + P12.decode(P10.encode(withDuplicates)));
    System.out.println("P13 " + P13.encodeDirect(withDuplicates));
    System.out.println("P14 " + P14.dupli(List.of("a", "b", "c", "c", "d")));
    System.out.println("P15 " + P15.dupli(List.of("a", "b", "c"), 3));
    System.out.println("P15 " + P15.dupli(List.of("a", "b", "c"), 0));
    System.out.println("P16 " + P16.drop(letters, 3));
    var split = P17.split(letters, 3);
    System.out.println("P17 " + split.prefix() + " " + split.suffix());
    System.out.println("P18 " + P18.slice(letters, 3, 7));
    System.out.println("P19 " + P19.rotate(letters, 3));
    System.out.println("P19 " + P19.rotate(letters, -2));
    System.out.println("P19 " + P19.rotate(letters, 30));
    var removal = P20.removeAt(List.of("a", "b", "c", "d"), 2);
    System.out.println("P20 " + removal.element() + " " + removal.list());
    System.out.println("P21 " + P21.insertAt("alfa", List.of("a", "b", "c", "d"), 2));
    System.out.println("P21 " + P21.insertAt("alfa", List.of("a", "b", "c", "d"), 5));
    System.out.println("P22 " + P22.range(4, 9));
    System.out.println("P23 " + P23.rndSelect(letters, 3));
    System.out.println("P24 " + P24.rndSelect(6, 49));
    System.out.println("P25 " + P25.rndPermu(List.of("a", "b", "c", "d", "e", "f")));

    System.out.println("P26 " + P26.combination(3, List.of("a", "b", "c", "d", "e", "f")).size() + " combinations");
    System.out.println("P26 " + P26.combination(3, List.of("a", "b", "c", "d")));

    var people = List.of("aldo", "beat", "carla", "david", "evi", "flip", "gary", "hugo", "ida");
    var firstGroup3 = P27.group3(people).getFirst();
    System.out.println("P27 " + firstGroup3.first() + " " + firstGroup3.second() + " " + firstGroup3.third());
    System.out.println("P27 " + P27.group3(people).size() + " groupings of 2, 3 and 4");
    System.out.println("P27 " + P27.group(people, List.of(2, 2, 5)).size() + " groupings of 2, 2 and 5");

    var sublists = List.of(List.of("a", "b", "c"), List.of("d", "e"), List.of("f", "g", "h"), List.of("d", "e"),
            List.of("i", "j", "k", "l"), List.of("m", "n"), List.of("o"));
    System.out.println("P28 " + P28.lsort(sublists));
    System.out.println("P28 " + P28.lfsort(sublists));
}