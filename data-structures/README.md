# Data structures with JAVA

> All the data structures can be implemented on other languages

## How Run

- Run `./gradlew build` for build the project
- Run `./gradlew test` for run all unit tests

1. Array
    - Simpler structure, called of inline structure
    - Use indexes for a handle with positions
    - In Java Arrays need to use predetermined positions number
   
## Questions:

Como funciona a inserção em um vetor? Cite dois algoritmos para inserção nela, um que seja rápido e um que seja devagar.

**R:** - Podemos percorrer todo o array adicionando items, forma lenta, ou utilizarmos uma posição incremental para adicionarmos um novo valor baseado nessa posição, que deve ser a ultima

Por que a deleção em um vetor é demorada?

**R:** - Pois precisamos percorrer todo o array e também reorganiza-lo

Por que inserir no meio de um vetor também é demorado?

**R:** - Porque precisamos reorganizar os elementos já presentes no array. Isso também faz com que no pior caso, o tempo seja linear, afinal ele pode precisar passar por todos os elementos.