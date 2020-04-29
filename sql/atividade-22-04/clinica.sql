DROP DATABASE IF EXISTS clinica;

CREATE DATABASE clinica;

USE clinica;

CREATE TABLE especialidade (
	id_especialidade INT NOT NULL AUTO_INCREMENT,
	descricao VARCHAR(50) NOT NULL,
	CONSTRAINT pk_especialidade PRIMARY KEY (id_especialidade)
);

CREATE TABLE medico (
	id_medico INT NOT NULL AUTO_INCREMENT,
	salario DOUBLE NOT NULL,
	nome VARCHAR(100) NOT NULL,
	CRM CHAR(11) NOT NULL,
	beneficio VARCHAR(30) NOT NULL,
	id_especialidade INT NOT NULL,
	CONSTRAINT pk_medico PRIMARY KEY (id_medico),
	CONSTRAINT check_salario CHECK (salario > 0),
	CONSTRAINT check_beneficion CHECK (beneficio < salario),
	CONSTRAINT fk_especialidade 
		FOREIGN KEY (id_especialidade)
		REFERENCES especialidade(id_especialidade)
		ON DELETE CASCADE
);

CREATE TABLE paciente (
	id_paciente INT NOT NULL AUTO_INCREMENT,
	nome VARCHAR(100) NOT NULL,
	idade INT NOT NULL CHECK (idade < 100 AND idade >= 0),
	estado CHAR(2) NOT NULL CHECK (estado in ("RS", "SC", "PR")), 
	CONSTRAINT pk_paciente PRIMARY KEY (id_paciente, nome)
);

CREATE TABLE quarto (
	id_quarto INT UNIQUE AUTO_INCREMENT,
	numero INT NOT NULL,
	CONSTRAINT pk_quarto PRIMARY KEY (id_quarto, numero)
);

CREATE TABLE internacao (
	id_medico INT NOT NULL DEFAULT 100,
	id_paciente INT NOT NULL,
	data_hora DATE NOT NULL,
	id_quarto INT NULL,
	CONSTRAINT pk_internacao PRIMARY KEY (id_paciente, id_medico, data_hora),
	CONSTRAINT fk_medico FOREIGN KEY (id_medico)
		REFERENCES medico(id_medico)
		ON DELETE SET DEFAULT
		ON UPDATE SET DEFAULT,
	CONSTRAINT fk_paciente FOREIGN KEY (id_paciente)
		REFERENCES paciente(id_paciente)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	CONSTRAINT fk_quarto FOREIGN KEY (id_quarto)
		REFERENCES quarto(id_quarto)
		ON DELETE SET NULL
		ON UPDATE SET NULL
);
