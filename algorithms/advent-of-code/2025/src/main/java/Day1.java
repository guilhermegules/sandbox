import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class Day1 {
    private int zeroCount = 0;
    private int dial = 50;

    public void solution() throws IOException {
        final var inputStream = getInputStream();

        try (final var reader = new BufferedReader(new InputStreamReader(inputStream))) {
            reader.lines()
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .forEach(line -> {
                        char direction = line.charAt(0);
                        int rotation = Integer.parseInt(line.substring(1));

                        checkEachClick(rotation, direction);
                    });
        }

        System.out.println("Password: " + zeroCount);
    }

    private void checkEachClick(int rotation, char direction) {
        for (int i = 0; i < rotation; i++) {
            if (direction == 'R') {
                dial = (dial + 1) % 100;
            } else {
                dial = (dial - 1 + 100) % 100;
            }

            if (dial == 0) {
                zeroCount++;
            }
        }
    }

    private InputStream getInputStream() {
        final var inputStream = getClass()
                .getClassLoader()
                .getResourceAsStream("day1-data.txt");

        if (inputStream == null) {
            throw new IllegalArgumentException("File not found!");
        }

        return inputStream;
    }
}
