package std.data.struct.util;

import std.data.struct.model.Student;

import java.util.Arrays;

public class Array {
    private Student[] students = new Student[100];
    private int totalOfStudents = 0;

    public void add(Student student) {
        this.keepSpace();

        this.students[totalOfStudents] = student;
        this.totalOfStudents++;
    }

    public void add(int index, Student student) {
        this.keepSpace();

        if(!validPosition(index)) {
            throw new IllegalArgumentException("Invalid position of array");
        }

        for(int i = totalOfStudents; i >= index; i--) {
            students[i + 1] = students[i];
        }

        students[index] = student;
        totalOfStudents++;
    }

    public Student get(int index) {
        if(!occupiedPosition(index)) {
            throw new IllegalArgumentException("Occupied position of array");
        }

        return students[index];
    }

    public void remove(int index) {
        for (int i = index; i < this.totalOfStudents; i++) {
            this.students[i] = this.students[i + 1];
        }

        this.totalOfStudents--;
    }

    public boolean have(Student student) {
        for(int i = 0; i < totalOfStudents; i++) {
            if (student.equals(students[i])) {
                return true;
            }
        }

        return false;
    }

    public int size() {
        return this.totalOfStudents;
    }

    public String toString() {
        return Arrays.toString(students);
    }
    
    private void keepSpace() {
        if(totalOfStudents != students.length) return;

        Student[] newList = new Student[students.length * 2];
        for (int i = 0; i < students.length; i++) {
            newList[i] = students[i];
        }

        this.students = newList;
    }

    private boolean occupiedPosition(int index) {
        return index >= 0 && index < totalOfStudents;
    }

    private boolean validPosition(int index) {
        return index >= 0 && index <= totalOfStudents;
    }
}
