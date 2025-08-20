package std.data.struct.test;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import std.data.struct.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class SetTest {

    public Set set;

    @BeforeEach
    public void init() {
        this.set = new Set();
    }

    @Test
    public void shouldAddValueIfItsNotPresentOnList() {
        this.set.add("Guilherme");
        this.set.add("Guilherme");

        assertEquals(this.set.sizeOfList("G"), 1);
    }

    @Test
    public void shouldRemoveValueFromList() {
        this.set.add("João");
        this.set.add("José");

        this.set.add("Marcelo");

        this.set.remove("José");

        assertEquals(this.set.sizeOfList("J"), 1);
        assertEquals(this.set.sizeOfList("M"), 1);
    }
}
