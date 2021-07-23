package std.data.struct.test;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import std.data.struct.util.LinkedList;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class LinkedListTest {

    private LinkedList linkedList;

    @BeforeEach
    public void init() {
        linkedList = new LinkedList();
    }

    @Test
    public void shouldAddLastElementOnFirstPosition() {
        linkedList.addOnFirstPosition("Guilherme");
        linkedList.addOnFirstPosition("Guilherme 2");
        linkedList.addOnFirstPosition("Guilherme 3");

        assertEquals(linkedList.get(0), "Guilherme 3");
        assertEquals(linkedList.size(), 3);
    }

    @Test
    public void shouldRemoveTheFirstElement() {
        linkedList.addOnFirstPosition("Guilherme");
        linkedList.addOnFirstPosition("Guilherme 2");
        linkedList.addOnFirstPosition("Guilherme 3");

        linkedList.pop();

        assertEquals(linkedList.size(), 2);
    }

    @Test
    public void shouldAddElementInMiddleOfList() {
        linkedList.addOnFirstPosition("Guilherme");
        linkedList.addOnFirstPosition("Guilherme 2");
        linkedList.addOnFirstPosition("Guilherme 3");
        linkedList.add("Guilherme 4", 0);

        assertEquals(linkedList.get(0), "Guilherme 4");
    }

    @Test
    public void shouldGetElementIfItsPresentOnList() {
        linkedList.addOnFirstPosition("John");

        assertEquals(linkedList.has("John"), true);
        assertEquals(linkedList.has("Another name"), false);
    }

    @Test
    public void shouldRemoveInAnyPosition() {
        linkedList.addOnFirstPosition("John");
        linkedList.addOnFirstPosition("John2");
        linkedList.addOnFirstPosition("John3");
        linkedList.addOnFirstPosition("John4");

        linkedList.remove(3);

        assertEquals(linkedList.size(), 3);
    }
}
