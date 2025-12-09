package db

import (
	"database/sql"

	_ "github.com/lib/pq"
)

func connectDb() *sql.DB {
	connection := "user=admin dbname=ecommerce password=admin host=localhost sslmode=disable"
	db, err := sql.Open("postgres", connection)

	if err != nil {
		panic(err.Error())
	}

	return db
}
