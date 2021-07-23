package std.data.struct.util;

import std.data.struct.model.Cell;

public class LinkedList {

    private Cell first = null;
    private Cell last = null;
    private int totalOfElements = 0;

    public void addOnFirstPosition(Object element) {
        if(totalOfElements == 0) {
            Cell newCell = new Cell(element);
            this.first = newCell;
            this.last = newCell;
            this.totalOfElements++;
            return;
        }

        Cell newCell = new Cell(element);
        this.first.setPrevious(newCell);
        this.first = newCell;
        this.totalOfElements++;
    }

    public void add(Object element) {
        if(this.totalOfElements == 0) {
            this.addOnFirstPosition(element);
            return;
        }

        Cell newCell = new Cell(element);
        this.last.setPrevious(newCell);
        newCell.setPrevious(this.last);
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

        Cell previousCell = this.getCell(index - 1);
        Cell nextCell = previousCell.getNext();
        Cell newCell = new Cell(element, previousCell.getNext());

        newCell.setPrevious(previousCell);
        previousCell.setNext(newCell);
        nextCell.setPrevious(newCell);
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

    public void removeLastCell() {
        if(this.totalOfElements == 1) {
            this.pop();
            return;
        }

        Cell penultimateCell = this.last.getPrevious();
        penultimateCell.setNext(null);
        this.last = penultimateCell;
        this.totalOfElements--;
    }

    public void remove(int index) {
        if(index == 0) {
            this.pop();
            return;
        }

        if(index == this.totalOfElements - 1) {
            this.removeLastCell();
            return;
        }

        Cell previous = this.getCell(index - 1);
        Cell actual = previous.getNext();
        Cell next = actual.getNext();

        previous.setNext(next);
        next.setPrevious(previous);

        this.totalOfElements--;
    }

    public int size() {
        return this.totalOfElements;
    }

    public boolean has(Object element) {
        Cell actual = this.first;

        while (actual != null) {
            if(actual.getElement().equals(element)) {
                return true;
            }

            actual = actual.getNext();
        }

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
