CREATE TABLE doctor (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    crm VARCHAR(6) NOT NULL UNIQUE,
    specialty VARCHAR(100) NOT NULL,
    patio VARCHAR(100) NOT NULL,
    neighborhood VARCHAR(100) NOT NULL,
    zip VARCHAR(9) NOT NULL,
    additional_data VARCHAR(100),
    number VARCHAR(20),
    state VARCHAR(2) NOT NULL,
    city VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
);
