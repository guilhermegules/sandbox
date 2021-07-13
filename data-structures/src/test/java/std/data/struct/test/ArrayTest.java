package std.data.struct.test;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import std.data.struct.model.Student;
import std.data.struct.util.Array;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ArrayTest {

    private Student s1 = new Student("John");
    private Array list;

    @BeforeEach
    public void init() {
        list = new Array();
    }

    @Test
    public void add() {
        list.add(s1);
        assertEquals(s1, list.get(0));
    }

    @Test
    public void addElementsOnSamePosition() {
        list.add(s1);
        list.add(0, new Student("Mary"));

        assertEquals(2, list.size());
    }

    @Test
    public void size() {
        list.add(s1);
        assertEquals(1, list.size());
    }

    @Test
    public void remove() {
        list.add(new Student("John doe"));
        list.remove(0);

        assertEquals(0, list.size());
    }

    @Test
    public void have() {
        Student s1 = new Student("Student 1");
        list.add(s1);

        assertEquals(true, list.have(s1));
        assertEquals(false, list.have(new Student("Invalid")));
    }

    @Test
    public void shouldKeepSpaceOnArray() {
        for(int i = 0; i < 300; i++) {
            list.add(new Student("Student: " + i));
        }

        assertEquals(300, list.size());
    }
}
