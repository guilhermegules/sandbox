package org.advent.code;


import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.net.URL;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class Main {

  private static final ObjectMapper objectMapper = new ObjectMapper();
  private static final List<String> games;

  static {
    try {
      games = objectMapper.readValue(
          new URL("file:src/main/resources/source.json"), Game.class)
          .list;
    } catch (IOException e) {
      throw new RuntimeException("Malformed URL");
    }
  }

  private static final List<String> OPTIONS = List.of("blue", "red", "green");

  private static final int RED_CUBES = 12;
  private static final int BLUE_CUBES = 14;
  private static final int GREEN_CUBES = 13;

  public static void main(String[] args) {
    final var mapGame = new HashMap<String, HashMap<String, Integer>>();

    games.forEach(game -> {
      final var g = game.split(":");
      final var gameId = g[0].replace("Game ", "");
      final var sets = g[1].trim().split(" ");

      final var rows = Arrays.stream(sets).map(s -> s.replace(",", "").replace(";", "")).toList();
      final var mapColor = new HashMap<String, Integer>();

      OPTIONS.forEach(option -> {
        mapColor.put(option, 0);
      });

      final var numbers = rows.stream()
          .filter(Main::isInt)
          .map(Integer::parseInt)
          .toList();
      final var colors = rows.stream()
          .filter(word -> !isInt(word) && !word.isEmpty())
          .toList();

      for (int i = 0; i < numbers.size(); i++) {
        mapColor.put(
            colors.get(i),
            mapColor.get(colors.get(i)) + numbers.get(i)
        );
      }

      mapGame.put(gameId, mapColor);
    });

    final var sumGameIds = mapGame.keySet()
        .stream()
        .filter(game ->
            mapGame.get(String.valueOf(game)).get("blue") <= BLUE_CUBES
                && mapGame.get(String.valueOf(game)).get("red") <= RED_CUBES
                && mapGame.get(String.valueOf(game)).get("green") <= GREEN_CUBES
        )
        .mapToInt(Integer::parseInt)
        .sum();

    System.out.println("Result: " + sumGameIds);
  }

  public static boolean isInt(String str) {
    if (str == null) {
      return false;
    }
    try {
      int d = Integer.parseInt(str);
    } catch (NumberFormatException nfe) {
      return false;
    }
    return true;
  }
}