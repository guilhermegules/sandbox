package std.data.struct.util;

import java.util.LinkedList;
import java.util.List;

public class Stack {

    private List<Object> list = new LinkedList();

    public void push(Object element) {
        list.add(element);
    }

    public Object pop() {
        return this.list.remove(this.list.size() - 1);
    }

    public Object peek() {
        return this.list.get(this.list.size() - 1);
    }

    public boolean isEmpty() {
        return list.isEmpty();
    }

    @Override
    public String toString() {
        return this.list.toString();
    }
}
