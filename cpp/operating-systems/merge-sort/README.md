# Merge Sort Algorithm

- Informações importantes [Merge sort](https://pt.wikipedia.org/wiki/Merge_sort)
- Observações:
  - É possível implementar o _merge sort_ utilizando somente um vetor auxiliar ao longo de toda a execução, tornando assim a complexidade de espaço adicional igual a ![](https://wikimedia.org/api/rest_v1/media/math/render/svg/1b8781cea4259c3bd43204e02d08b9b9ce8fe0ff).
  - É um algoritmo estável na maioria das implementações, em que elas podem ser iterativas ou recursivas.
  - É possível também implementar o algoritmo com espaço adicional ![](https://wikimedia.org/api/rest_v1/media/math/render/svg/fb3ae2cd10dbd21019bb13c462144f1bdc030e49).
  - Algoritmo criado por [Von Neumann](https://pt.wikipedia.org/wiki/John_von_Neumann) em 1945
- Desvantagens:
  - Utiliza funções recursivas.
  - Gasto extra de memória. O algoritmo cria uma cópia do vetor para cada nível da chamada recursiva, totalizando um uso adicional de memória igual a ![](https://wikimedia.org/api/rest_v1/media/math/render/svg/1b8781cea4259c3bd43204e02d08b9b9ce8fe0ff).
