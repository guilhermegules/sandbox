package std.data.struct.util;

import std.data.struct.model.Cell;

public class LinkedList {

    private Cell first = null;
    private Cell last = null;
    private int totalOfElements = 0;

    public void addOnFirstPosition(Object element) {
        Cell newCell = new Cell(element, first);
        this.first = newCell;

        if(this.totalOfElements == 0) {
            this.last = this.first;
        }

        this.totalOfElements++;
    }

    public void add(Object element) {
        if(this.totalOfElements == 0) {
            this.addOnFirstPosition(element);
            return;
        }

        Cell newCell = new Cell(element, null);
        this.last.setNext(newCell);
        this.last = newCell;
        this.totalOfElements++;

    }

    public void add(Object element, int index) {
        if(index == 0) {
            this.addOnFirstPosition(element);
            return;
        }

        if(index == this.totalOfElements) {
            this.add(element);
            return;
        }

        Cell previous = this.getCell(index - 1);
        Cell newCell = new Cell(element, previous.getNext());
        previous.setNext(newCell);
        this.totalOfElements++;
    }

    public Object get(int index) {
        return this.getCell(index).getElement();
    }

    public void pop() {
        if(this.totalOfElements == 0) {
            throw new IllegalArgumentException("Empty list");
        }

        this.first = this.first.getNext();
        this.totalOfElements--;

        if(totalOfElements == 0) {
            this.last = null;
        }
    }

    public void remove(int index) {
        // TODO: will be implemented with double linked lists
    }

    public int size() {
        return this.totalOfElements;
    }

    public boolean has(Object element) {
        return false;
    }

    @Override
    public String toString() {
        if(this.totalOfElements == 0) {
            return "[]";
        }

        Cell actual = first;
        StringBuilder builder = new StringBuilder("[");

        for(int i = 0; i < totalOfElements; i++) {
            builder.append(actual.getElement());
            builder.append(",");
        }

        builder.append("]");
        return builder.toString();
    }

    private boolean isOccupied(int index) {
        return index >= 0 && index < this.totalOfElements;
    }

    private Cell getCell(int index) {
        if(!isOccupied(index)) {
            throw new IllegalArgumentException("Invalid position");
        }

        Cell actual = this.first;

        for(int i = 0; i < index; i++) {
            actual = actual.getNext();
        }

        return actual;
    }
}
