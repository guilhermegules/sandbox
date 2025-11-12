# Spring Batch Service

A service that imports data from a CSV spreadsheet, transforms it with custom code and stores the final results in a database

## What you need

- Java 17+
- Gradle 7.5+

## How run

- Build project `./gradlew clean build`
- Run project `./gradlew bootRun`

## Result

```bash
Converting (Person[firstName=Jill, lastName=Doe]) into (Person[firstName=JILL, lastName=DOE])
Converting (Person[firstName=Joe, lastName=Doe]) into (Person[firstName=JOE, lastName=DOE])
Converting (Person[firstName=Justin, lastName=Doe]) into (Person[firstName=JUSTIN, lastName=DOE])
Converting (Person[firstName=Jane, lastName=Doe]) into (Person[firstName=JANE, lastName=DOE])
Converting (Person[firstName=John, lastName=Doe]) into (Person[firstName=JOHN, lastName=DOE])
Found <{Person[firstName=JILL, lastName=DOE]}> in the database.
Found <{Person[firstName=JOE, lastName=DOE]}> in the database.
Found <{Person[firstName=JUSTIN, lastName=DOE]}> in the database.
Found <{Person[firstName=JANE, lastName=DOE]}> in the database.
Found <{Person[firstName=JOHN, lastName=DOE]}> in the database.
```
