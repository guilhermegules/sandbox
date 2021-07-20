package std.data.struct.util;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

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

        assertEquals(linkedList.get(0), "Guilherme 2");
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
}
