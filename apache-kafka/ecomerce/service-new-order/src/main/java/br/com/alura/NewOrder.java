package br.com.alura;

import java.math.BigDecimal;
import java.util.UUID;

public class NewOrder {
    public static void main(String[] args)  {
        try (
            var orderDispatcher = new KafkaDispatcher<Order>();
            var emailDispatcher = new KafkaDispatcher<String>()
        ) {
            var userId = UUID.randomUUID().toString();
            var orderId = UUID.randomUUID().toString();
            var amount = BigDecimal.valueOf(Math.random() * 5000 + 1);

            var order = new Order(userId, orderId, amount);

            var emailBody = "Thank you for your order! We are processing your order!";
            var emailId = UUID.randomUUID().toString();

            orderDispatcher.send("ECOMMERCE_NEW_ORDER", userId, order);
            emailDispatcher.send("ECOMMERCE_SEND_EMAIL", emailId, emailBody);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }
}