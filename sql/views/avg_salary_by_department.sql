CREATE VIEW avg_salary_by_department AS
SELECT d.name AS department_name,
       AVG(e.salary) AS average_salary
FROM employees e
JOIN departments d ON e.department_id = d.id
GROUP BY d.name;

SELECT * FROM avg_salary_by_department;
