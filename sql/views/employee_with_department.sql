CREATE VIEW employee_with_department AS
SELECT e.id,
       e.first_name,
       e.last_name,
       d.name AS department_name,
       e.salary
FROM employees e
JOIN departments d ON e.department_id = d.id;
