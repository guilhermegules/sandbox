import java.util.List;

public record Run<T>(int count, T element) {

    public Run {
        if (count < 1) {
            throw new IllegalArgumentException("count must be at least 1: " + count);
        }
    }

    static <T> Run<T> of(List<T> consecutive) {
        return new Run<>(consecutive.size(), consecutive.getFirst());
    }

    @Override
    public String toString() {
        return "[" + count + "," + element + "]";
    }
}