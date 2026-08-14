# SQL views

## 1. What is a SQL View?

A view is like a virtual table — it’s based on the result of a query, but it doesn’t store data itself (unless it’s a materialized view, which does store results).
Think of it as a **saved query** that you can treat like a table.

### Why use views?

- Reusability – Save complex queries and use them like a simple table.
- Security – Hide sensitive columns from certain users.
- Abstraction – Change the underlying table structure without changing all the queries that depend on it.
- Simplification – Make complex joins or aggregations easier to read.

## 2. Basic Syntax

```sql
CREATE VIEW view_name AS
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

## 3. Example Scenarios

Employes

| id | first\_name | last\_name | department\_id | salary |
| -- | ----------- | ---------- | -------------- | ------ |
| 1  | Alice       | Smith      | 1              | 70000  |
| 2  | Bob         | Brown      | 1              | 90000  |
| 3  | Charlie     | Johnson    | 2              | 50000  |

Departments

| id | name        |
| -- | ----------- |
| 1  | Engineering |
| 2  | Sales       |

## 💡 Important notes

- Views are read-only if they use joins, group by, or aggregates (unless you use INSTEAD OF triggers).
- They don’t store data — every query runs the underlying SQL.
- For performance on big datasets, Materialized Views are better, since they cache results.
  
