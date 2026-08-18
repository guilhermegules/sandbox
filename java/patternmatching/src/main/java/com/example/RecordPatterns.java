package com.example;

public class RecordPatterns {

    public static String describeSegment(Segment segment) {
        return switch (segment) {
            case Segment(Point(int x1, int y1), Point(int x2, int y2))
                    when x1 == x2 && y1 == y2 ->
                    "Point segment at (%d, %d)".formatted(x1, y1);
            case Segment(var start, var end) when segment.isHorizontal() ->
                    "Horizontal segment from " + start + " to " + end;
            case Segment(var start, var end) when segment.isVertical() ->
                    "Vertical segment from " + start + " to " + end;
            case Segment(var start, var end) ->
                    "Diagonal segment from " + start + " to " + end;
        };
    }

    public static String nestedRecord(Object obj) {
        if (obj instanceof Segment(Point(int sx, int sy), Point(int ex, int ey))) {
            return "From (%d,%d) to (%d,%d)".formatted(sx, sy, ex, ey);
        }
        return "Not a segment";
    }

    public static void main(String[] args) {
        System.out.println(describeSegment(new Segment(new Point(2, 3), new Point(2, 3))));
        System.out.println(describeSegment(new Segment(new Point(0, 5), new Point(4, 5))));
        System.out.println(describeSegment(new Segment(new Point(7, 0), new Point(7, 9))));
        System.out.println(describeSegment(new Segment(new Point(1, 1), new Point(2, 4))));
        System.out.println(nestedRecord(new Segment(new Point(1, 2), new Point(3, 4))));
    }
}
