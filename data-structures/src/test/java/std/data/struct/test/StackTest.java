package std.data.struct.test;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import std.data.struct.util.Stack;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class StackTest {

    public Stack stack;

    @BeforeEach
    public void init() {
        this.stack = new Stack();
    }

    @Test
    public void shouldAddElementsAndGetLastPushedOne() {
        this.stack.push(1);
        this.stack.push(2);
        this.stack.push(3);

        assertEquals(this.stack.peek(), 3);
    }

    @Test
    public void shouldAddElementsAndRemoveLastPushedOne() {
        this.stack.push(1);
        this.stack.push(2);
        this.stack.push(3);

        assertEquals(this.stack.pop(), 3);
        assertEquals(this.stack.toString(), "[1, 2]");
    }

    @Test
    public void shouldCheckIsStackIsEmpty() {
        this.stack.push(1);

        assertEquals(this.stack.isEmpty(), false);

        this.stack.pop();

        assertEquals(this.stack.isEmpty(), true);
    }
}
