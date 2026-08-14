# DSMovie Spring API

Api with Spring made on Spring React week

## Install

```bash
maven # build and install dependencies
```

## Run the app

```bash
maven start # run application on localhost:3030
```

## Run the tests

```bash
maven test # run all unit tests
```

## Endpoints

### Movies

- GET `/movies`
  - Response [Page](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/domain/Page.html)
    - ```json
       {
          "content": [
              {
                "id": "Long",
                "title": "String",
                "score": "Double",
                "count": "Integer",
                "image": "String"
              }
          ]
       }
      ```   
- GET `/movies/${id}`
  - Response 
    - ```json
       {
          "id": "Long",
          "title": "String",
          "score": "Double",
          "count": "Integer",
          "image": "String"
       }
      ```  

### Scores

- PUT `/scores`
  - Response 
    -  ```json
         {
            "id": "Long",
            "title": "String",
            "score": "Double",
            "count": "Integer",
            "image": "String"
         }
        ```    
  - Body 
    - ```json
        {
          "movieId": "Long",
          "email": "String",
          "score": "Double"
        }
      ```  
