package com.example.accessingdatamongodb.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MongoConfiguration {

  @Bean
  public MongoClient mongoclient() {
    return MongoClients.create("mongodb://localhost:27017");
  }
}
