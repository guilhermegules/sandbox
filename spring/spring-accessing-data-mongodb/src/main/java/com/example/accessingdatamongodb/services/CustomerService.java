package com.example.accessingdatamongodb.services;

import com.example.accessingdatamongodb.models.Customer;
import com.example.accessingdatamongodb.repositories.CustomerRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

@Service
public class CustomerService implements CommandLineRunner {

  @Autowired private CustomerRepository customerRepository;

  private static Logger LOGGER = LogManager.getLogger(CustomerService.class);

  @Override
  public void run(String... args) throws Exception {
    this.customerRepository.deleteAll();

    this.customerRepository.save(new Customer("Guilherme", "Gules"));
    this.customerRepository.save(new Customer("João", "Silva"));
    this.customerRepository.save(new Customer("Pedro", "Silva"));

    LOGGER.info("Customers found with findAll()");
    LOGGER.info("------------------------------");
    this.customerRepository.findAll().stream().forEach(LOGGER::info);

    LOGGER.info("Customer found with name Guilherme");
    LOGGER.info("----------------------------------");
    LOGGER.info(this.customerRepository.findByFirstName("Silve"));

    LOGGER.info("Customers found with last name Silva");
    LOGGER.info("------------------------------------");
    this.customerRepository.findByLastName("Silva").stream().forEach(LOGGER::info);
  }
}
