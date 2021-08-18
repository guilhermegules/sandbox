# Run Length Enconding algorithm

**Enunciado do trabalho:**

Implemente um código em ANSI C capaz de comprimir em formato RLE uma matriz dada e realizar a sua posterior descompressão. Cada célula da matriz de entrada será formada por um número inteiro com valores entre 0 e 255.

A matriz de entrada deverá ser lida a partir de um arquivo em formato texto com a seguinte sintaxe:

```
6
6
0; 0; 0; 0; 0; 0;
0; 0; 0; 0; 0; 0;
0; 0; 255; 255; 0; 0;
0; 0; 0; 0; 0; 0;
0; 0; 0; 0; 0; 0;
```

Sendo:
A primeira linha informa a quantidade de linhas da matriz.

A segunda linha informa a quantidade de colunas da matriz.

As linhas seguintes informam os valores contidos em cada célula da matriz, iniciando-se o posicionamento a partir da primeira linha (a mais de cima) e da coluna mais da esquerda. Cada valor individual é seguido por um sinal de ponto e vírgula. Cada linha do arquivo corresponde a uma linha da matriz.

O resultado deverá ser salvo em um arquivo em formato texto, utilizando-se da sintaxe já mencionada anteriormente no formato RLE.
O programa deverá ser capaz de funcionar corretamente com matrizes bidimensionais com quaisquer quantidades de linhas e colunas a partir de 3x3. Não precisam ser necessariamente matrizes quadradas.

### Tipos de retorno em C

returns 1 when it can't access required files. This usually includes

- Can't find the object file to be linked (or Access denied)
- Can't find one or more symbols to link
- Can't open the executable for writing (or AD)
