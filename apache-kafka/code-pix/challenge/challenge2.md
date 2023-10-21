# Desafio 02 - Dockerizando app Nest.js e Golang com gRPC

Informações do desafio

Neste desafio, você deve pegar a aplicação do desafio 1 e integra-la com Docker Compose, ou seja, ao rodar o comando "docker compose up" já deve subir automaticamente o servidor gRPC na porta 50051.

A segunda etapa do desafio é criar uma aplicação Nest.js que seja o gRPC client do Golang, portanto teremos uma API REST na porta 3000 que terá 2 endpoints:

- POST /products - que ao ser acessado deve fazer uma chamada rpc para o CreateProduct do Golang e devolver como resultado os dados do produto criado
- GET /products - Ao ser acessado deve fazer uma chamada rpc para o FindProducts e retornar a lista de produtos do Golang

Disponibilize a aplicação Nest.js no mesmo docker-compose.yaml.

Portanto, ao rodar o docker compose up deve subir a aplicação Golang e Nest.js automaticamente.
