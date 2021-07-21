--Retorna todos os dados de alunos que nasceram entre 1999 e 2010
SELECT * 
    FROM aluno
        WHERE data_nascimento BETWEEN "1999-01-01" AND "2010-12-31";

--Retorna todos os alunos do sexo masculino e feminino (Separadamente), que nasceram entre 1990 e 1999
SELECT count(id_aluno) as total_alunos, sexo
    FROM aluno
        WHERE data_nascimento BETWEEN "1990-01-01" AND "1999-12-31"
            GROUP BY sexo;

--Retorna todas as turmas que tem o status = 2 (Andamento) e terminam ou terminarão em 2019
SELECT turma.*, status.nome AS status
    FROM turma 
        JOIN status ON turma.fk_Status_turma = status.id_status
            WHERE status.id_status = 2 AND data_termino like "2019-%-%";

--Retorna nome, idade, email e escolaridade de alunos que tenham escolaridade 3 (Ensino superior)
SELECT aluno.nome, TIMESTAMPDIFF(YEAR, aluno.data_nascimento, CURDATE()) AS idade, aluno.email, escolaridade.nome
    FROM aluno
        JOIN escolaridade ON aluno.fk_Escolaridade_aluno = escolaridade.id_escolaridade
            WHERE escolaridade.id_escolaridade = 3
                ORDER BY aluno.nome;

--Retorna nome, idade_minima para cursar e escolaridade de cursos que tenham um nome inicial de "Técnico" e escolaridade "Ensino fundamental"
SELECT curso.nome, curso.idade_minima, escolaridade.nome
    FROM curso 
        JOIN escolaridade ON curso.fk_Escolaridade_curso = escolaridade.id_escolaridade
            WHERE curso.nome LIKE "Técnico %" AND escolaridade.nome like "Ensino Fundamental"
                ORDER BY curso.nome;  

--Retorna todos os dias em que as turmas terão aula e quais turnos a turma de id = 1 terá aula
SELECT turma.segunda, turma.terca, turma.quarta, turma.quinta, turma.sexta, turma.sabado, turno.nome
    FROM turma  
        JOIN turno_turma ON turno_turma.fk_Turma_id_turma = turma.id_turma
        JOIN turno ON turno.id_turno = turno_turma.fk_Turno_id_turno
            WHERE turno_turma.fk_Turma_id_turma = 1;

--Retorna nome, rg, sexo, data de nascimento e Identificação de turma dos alunos que estão na turma = 1
SELECT aluno.nome, aluno.rg, aluno.sexo, aluno.data_nascimento, turma.id_turma AS turma
    FROM aluno
        JOIN aluno_turma ON aluno_turma.fk_Aluno_id_aluno = aluno.id_aluno
        JOIN turma ON turma.id_turma = aluno_turma.fk_Turma_id_turma
            WHERE aluno_turma.fk_Turma_id_turma = 1; 

--Retorna nome, idade e descrição de professores que nasceram entre 1960 e 1999
SELECT professor.nome, TIMESTAMPDIFF(YEAR, professor.data_nascimento, CURDATE()) AS idade, professor.descricao
    FROM professor
        WHERE professor.data_nascimento BETWEEN "1960-01-01" AND "1999-12-31"
            ORDER BY professor.nome;

--Retorna nome e email de todos os professores que estão vinculados as turmas 1, 3   
SELECT professor.nome, professor.email_institucional
    FROM professor
        JOIN turma ON turma.fk_Professor_turma = professor.id_professor
            WHERE turma.id_turma IN (1,2) AND turma.data_termino like "2019-%-%"
                ORDER BY professor.nome;

--Retorna todos os alunos menores de idade
SELECT aluno.nome, aluno.RG, TIMESTAMPDIFF(YEAR, aluno.data_nascimento, CURDATE()), aluno.sexo, aluno.email
    FROM aluno
        WHERE TIMESTAMPDIFF(YEAR, aluno.data_nascimento, CURDATE()) < 18; 
