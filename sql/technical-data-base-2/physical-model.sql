CREATE TABLE Professor (
    id_professor INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    email_pessoal VARCHAR(100) NOT NULL,
    email_institucional VARCHAR(100) NOT NULL,
    descricao VARCHAR(1024) NULL DEFAULT "Sem descrição"
);

CREATE TABLE Turma (
    id_turma INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    segunda BIT NOT NULL,
    terca BIT NOT NULL,
    quarta BIT NOT NULL,
    quinta BIT NOT NULL,
    sexta BIT NOT NULL,
    sabado BIT NOT NULL,
    data_termino DATE NOT NULL,
    fk_Professor_turma INTEGER NOT NULL,
    fk_Status_turma INTEGER NOT NULL,
    fk_Disciplina_turma INTEGER NOT NULL
);

CREATE TABLE Aluno (
    id_aluno INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    RG VARCHAR(12) NOT NULL,
    nome VARCHAR(150) NOT NULL,
    sexo VARCHAR(1) NOT NULL,
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL,
    fk_Escolaridade_Aluno INTEGER NOT NULL
);

CREATE TABLE Disciplina_Ementa (
    id_disciplina INTEGER NOT NULL AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    carga_horaria INTEGER NOT NULL,
    ciclo INTEGER NOT NULL,
    id_ementa INTEGER NOT NULL,
    conteudo_pragmatico VARCHAR(1024) NOT NULL,
    bibliografia VARCHAR(1024) NULL DEFAULT "Sem bibliografia",
    PRIMARY KEY (id_disciplina, id_ementa)
);

CREATE TABLE Escolaridade (
    id_escolaridade INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(30) NOT NULL
);

CREATE TABLE Status (
    id_status INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(30) NOT NULL
);

CREATE TABLE Curso (
    id_curso INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    idade_minima INTEGER NOT NULL,
    ciclos INTEGER NOT NULL,
    fk_Escolaridade_curso INTEGER NOT NULL
);

CREATE TABLE Turno (
    id_turno INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(10) NOT NULL
);

CREATE TABLE Aluno_Turma (
    fk_Aluno_id_aluno INTEGER NOT NULL,
    fk_Turma_id_turma INTEGER NOT NULL
);

CREATE TABLE Disciplina_Curso (
    fk_Disciplina_Ementa_id_disciplina INTEGER NOT NULL,
    fk_Curso_id_curso INTEGER NOT NULL
);

CREATE TABLE Turno_Turma (
    fk_Turno_id_turno INTEGER NOT NULL,
    fk_Turma_id_turma INTEGER NOT NULL
);
ALTER TABLE Turma ADD CONSTRAINT FK_Professor_turma
    FOREIGN KEY (fk_Professor_turma)
    REFERENCES Professor(id_professor)
    ON DELETE RESTRICT;
 
ALTER TABLE Turma ADD CONSTRAINT FK_Status_turma
    FOREIGN KEY (fk_Status_turma)
    REFERENCES Status(id_status)
    ON DELETE RESTRICT;
 
ALTER TABLE Turma ADD CONSTRAINT FK_Disciplina_Ementa_turma
    FOREIGN KEY (fk_Disciplina_turma)
    REFERENCES Disciplina_Ementa(id_disciplina)
    ON DELETE RESTRICT;
 
ALTER TABLE Aluno ADD CONSTRAINT FK_Aluno_Escolaridade
    FOREIGN KEY (fk_Escolaridade_Aluno)
    REFERENCES Escolaridade(id_escolaridade)
    ON DELETE RESTRICT;
 
ALTER TABLE Curso ADD CONSTRAINT FK_Curso_Escolaridade
    FOREIGN KEY (fk_Escolaridade_curso)
    REFERENCES Escolaridade(id_escolaridade)
    ON DELETE RESTRICT;
 
ALTER TABLE Aluno_Turma ADD CONSTRAINT FK_Aluno_turma
    FOREIGN KEY (fk_Aluno_id_aluno)
    REFERENCES Aluno(id_aluno)
    ON DELETE RESTRICT;
 
ALTER TABLE Aluno_Turma ADD CONSTRAINT FK_Turma_aluno
    FOREIGN KEY (fk_Turma_id_turma)
    REFERENCES Turma(id_turma)
    ON DELETE RESTRICT;
 
ALTER TABLE Disciplina_Curso ADD CONSTRAINT FK_Disciplina_Curso_Disciplina
    FOREIGN KEY (fk_Disciplina_Ementa_id_disciplina)
    REFERENCES Disciplina_Ementa (id_disciplina)
    ON DELETE RESTRICT;
 
ALTER TABLE Disciplina_Curso ADD CONSTRAINT FK_Disciplina_Curso_Curso
    FOREIGN KEY (fk_Curso_id_curso)
    REFERENCES Curso (id_curso)
    ON DELETE RESTRICT;
 
ALTER TABLE Turno_Turma ADD CONSTRAINT FK_Turno_turma
    FOREIGN KEY (fk_Turno_id_turno)
    REFERENCES Turno (id_turno)
    ON DELETE RESTRICT;
 
ALTER TABLE Turno_Turma ADD CONSTRAINT FK_Turma_turno
    FOREIGN KEY (fk_Turma_id_turma)
    REFERENCES Turma (id_turma)
    ON DELETE RESTRICT;
    
