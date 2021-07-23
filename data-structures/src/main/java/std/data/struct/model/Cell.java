package std.data.struct.model;

public class Cell {
    private Object element;
    private Cell previous;
    private Cell next;

    public Cell(Object element) {
        this(element, null);
    }

    public Cell(Object element, Cell next) {
        this.element = element;
        this.next = next;
    }

    public Object getElement() {
        return element;
    }

    public Cell getNext() {
        return next;
    }

    public void setNext(Cell next) {
        this.next = next;
    }

    public Cell getPrevious() {
        return previous;
    }

    public void setPrevious(Cell previous) {
        this.previous = previous;
    }
}
