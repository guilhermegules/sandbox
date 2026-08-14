# Payment Service

## Overview

This project is a Java application built with Spring Boot that integrates Kafka, MongoDB, and PostgreSQL to demonstrate a scalable and resilient architecture for handling real-time data processing and persistence.

## Requirements:

- Java 17
- Spring
- Spring Webflux
- Apache Kafka
- MongoDB
- PostgreSQL

## Installation

- Step 1: Clone the Repository
```bash
git clone https://github.com/guilhermegules/payment-service.git
cd payment-service
```
- Step 2: Define environment vars as `.env.example`
- Step 3: Run docker compose
```bash
docker compose up # will build and download all the images for run the project
```
- Step 4: Build and Run the Application
```bash
# Run payment service
cd payment
./mvnw spring-boot:run # Will run in 8080 port
cd email
./mvnw spring-boot:run # Will run in 8001 port
```

Once the application is up and running, it will expose REST endpoints for interacting with Kafka, MongoDB, and PostgreSQL.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, feel free to create an issue or pull request.

## License

This project is licensed under the MIT License.
