package std.data.struct.util;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedList;

public class Set {

    private ArrayList<LinkedList<String>> table = new ArrayList();
    private static final int NUMBER_ALPHABET_LETTERS = 26;

    public Set() {
        for (int i = 0; i < this.NUMBER_ALPHABET_LETTERS; i++) {
            this.table.add(new LinkedList());
        }
    }

    public void add(String word) {
        if(contains(word)) return;

        int index = calculateIndex(word);
        List<String> list = this.table.get(index);
        list.add(word);
    }

    public void remove(String word) {
        if(!contains(word)) return;

        int index = calculateIndex(word);
        List<String> list = this.table.get(index);
        list.remove(word);
    }

    public int sizeOfList(String word) {
        int index = calculateIndex(word);
        List<String> list = this.table.get(index);

        return list.size();
    }

    private int calculateIndex(String word) {
        return word.toLowerCase().charAt(0) % this.NUMBER_ALPHABET_LETTERS;
    }

    private boolean contains(String word) {
        int index = this.calculateIndex(word);
        return this.table.get(index).contains(word);
    }

    @Override
    public String toString() {
        return this.table.toString();
    }
}
