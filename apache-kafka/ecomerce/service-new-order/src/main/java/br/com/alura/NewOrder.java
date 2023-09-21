package br.com.alura;

import java.math.BigDecimal;
import java.util.UUID;

public class NewOrder {
    public static void main(String[] args)  {
        try (
            var orderDispatcher = new KafkaDispatcher<Order>();
            var emailDispatcher = new KafkaDispatcher<String>()
        ) {
            var email = Math.random() + "@email.com";

            for (int i = 0; i < 10; i++) {
                var orderId = UUID.randomUUID().toString();
                var amount = BigDecimal.valueOf(Math.random() * 5000 + 1);

                var order = new Order(orderId, amount, email);

                var emailBody = "Thank you for your order! We are processing your order!";

                orderDispatcher.send("ECOMMERCE_NEW_ORDER", email, order);
                emailDispatcher.send("ECOMMERCE_SEND_EMAIL", email, emailBody);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }
}