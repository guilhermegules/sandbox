package br.com.alura;

import java.util.UUID;

public class NewOrder {
    public static void main(String[] args)  {
        try (var dispatcher = new KafkaDispatcher()) {
            var key = UUID.randomUUID().toString();
            var value = key + "132123,67523,89999897";
            var email = "Thank you for your order! We are processing your order!";

            dispatcher.send("ECOMMERCE_NEW_ORDER", key, value);
            dispatcher.send("ECOMMERCE_SEND_EMAIL", email, email);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }
}