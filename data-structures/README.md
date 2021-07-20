# Data structures with JAVA

> All the data structures can be implemented on other languages

## How Run

- Run `./gradlew build` for build the project
- Run `./gradlew test` for run all unit tests
- Run `gradle wrapper` to generate gradle-wrapper

1. Array
    - Simpler structure, called of inline structure
    - Use indexes for a handle with positions
    - In Java Arrays need to use predetermined positions number
2. LinkedList
   - Data structure which knows what the next element
   - This list we name the Linked List. The difference between it and the Vector is that these elements are
     next to each other in memory, while in the Linked list they are in different places, 
     but one points to the other indicating the next.
   - ![](./images/linked-list.png) 
   
## Questions:

Como funciona a inserção em um vetor? Cite dois algoritmos para inserção nela, um que seja rápido e um que seja devagar.

**R:** - Podemos percorrer todo o array adicionando items, forma lenta, ou utilizarmos uma posição incremental para adicionarmos um novo valor baseado nessa posição, que deve ser a ultima

Por que a deleção em um vetor é demorada?

**R:** - Pois precisamos percorrer todo o array e também reorganiza-lo

Por que inserir no meio de um vetor também é demorado?

**R:** - Porque precisamos reorganizar os elementos já presentes no array. Isso também faz com que no pior caso, o tempo seja linear, afinal ele pode precisar passar por todos os elementos.

Quais são as vantagens da lista ligada em relação ao vetor?

**R:** - A vantagem da lista ligada é que como a relação entre duas células é feita por referências, é fácil
inserir um elemento no meio da lista. Inserir no começo e no fim também leva tempo constante, afinal geralmente
a estrutura possui referências para o primeiro e último elemento.

E quais são as desvantagens da lista ligada em relação ao vetor?

**R:** Recuperar um elemento em uma posição aleatória pode levar tempo linear. Afinal, diferente do vetor
onde pegar um elemento qualquer custa uma simples operação de array, em uma lista ligada, precisamos navegar pelas
referências até encontrar o elemento desejado.

Explique, como funciona a remoção de um elemento que está no meio de uma lista ligada?

**R:** Se o elemento está no meio de um lista, a remoção dele é basicamente acertar a referência `proximo`
do elemento a esquerda e fazê-lo apontar para o próxima de X. Dessa forma, "pulamos" o elemento X
e a lista continua certa.

Comente sobre o tempo de execução da operação de remoção da lista ligada.

**R:** A remoção de uma lista ligada simples leva tempo linear. Afinal, precisamos navegar a lista até achar
o elemento antes e o depois do elemento a ser removido.