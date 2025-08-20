package std.data.struct.util;

import java.util.LinkedList;
import java.util.List;

public class Queue {
    private List<Object> list = new LinkedList();

    public void add(Object element) {
        this.list.add(element);
    }

    public Object poll() {
        return this.list.remove(0);
    }

    public boolean isEmpty() {
        return this.list.size() == 0;
    }

    public int size() {
        return this.list.size();
    }

    @Override
    public String toString() {
        return this.list.toString();
    }
}
