package br.com.alura;

import org.apache.kafka.clients.consumer.ConsumerRecord;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.UUID;

public class CreateUserService {

    private final Connection connection;

    CreateUserService() throws SQLException {
        var url = "jdbc:sqlite:service-users/target/users_database.db";
        this.connection = DriverManager.getConnection(url);
        try {
            var createUserTable = "CREATE TABLE user ("
                    + "           id VARCHAR(200) PRIMARY KEY,"
                    + "           email VARCHAR(200)"
                    + "                               )";
            connection.createStatement().execute(createUserTable);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        CreateUserService createUserService = null;
        try {
            createUserService = new CreateUserService();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        try(var service = new KafkaService(
                CreateUserService.class.getSimpleName(),
                "ECOMMERCE_NEW_ORDER",
                createUserService::parse,
                Order.class,
                new HashMap<String, String>())) {
            service.run();
        }
    }

    private void parse(ConsumerRecord<String, Order> record) throws SQLException {
        System.out.println("------------------------------------------");
        System.out.println("Processing new order, checking for new user");
        System.out.println(record.value());
        var order = record.value();
        var email = order.getEmail();
        if(isNewUser(email)) {
            insertNewUser(email);
        }
    }

    private void insertNewUser(String email) throws SQLException {
        var insertIntoUser = "INSERT INTO user (id, email) VALUES (?, ?)";
        var insert = connection.prepareStatement(insertIntoUser);
        insert.setString(1, UUID.randomUUID().toString());
        insert.setString(2, email);
        insert.execute();
        System.out.println("User added" + email);
    }

    private boolean isNewUser(String email) throws SQLException {
        var findUserByEmail = "SELECT id FROM user WHERE user.email = ? LIMIT 1";
        var exists = connection.prepareStatement(findUserByEmail);
        exists.setString(1, email);
        var results = exists.executeQuery();
        return !results.next();
    }
}