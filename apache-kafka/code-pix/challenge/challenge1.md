# Desafio 1

Dado o seguinte protofile gRPC: [Product](./product.proto)

Crie um servidor gRPC em Golang que realize as duas operações:

Criar produtos
Consultar produtos

A aplicação deve usar o SQLite como banco de dados e o GORM como ORM. Use o modo AutoMigrate para gerar as tabelas automaticamente.

Você deve disponibilizar um o script main.go que a rodar go run main.go deve levantar o servidor e deixar a porta 50051 acessível via localhost.
