package com.example;

public record Segment(Point start, Point end) {
    public boolean isHorizontal() {
        return start.y() == end.y();
    }

    public boolean isVertical() {
        return start.x() == end.x();
    }
}
