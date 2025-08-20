package std.data.struct.test;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import std.data.struct.util.Queue;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class QueueTest {
    private Queue queue;

    @BeforeEach
    public void init() {
        this.queue = new Queue();
    }

    @Test
    public void shouldAddAnewItemInQueue() {
        this.queue.add("First value");
        this.queue.add("Second value");

        assertEquals(this.queue.size(), 2);
    }

    @Test
    public void shouldRemoveElement() {
        this.queue.add("First element");
        this.queue.poll();

        assertEquals(this.queue.size(), 0);
    }

    @Test
    public void shouldVerifyIfQueueIsEmpty() {
        this.queue.add("John doe");

        assertEquals(this.queue.isEmpty(), false);

        this.queue.poll();

        assertEquals(this.queue.isEmpty(), true);
    }
}
