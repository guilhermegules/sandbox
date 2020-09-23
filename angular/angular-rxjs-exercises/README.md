# AngularRxjsExercises

> Exercises for understanting some operators

### Running:

- `npm install` install all dependencies;
- `npm start` run application;

#### Combine operators - operators for combine Observable requests

- `zip` - Can accept more than two Observables, they must all wait for each other;
- `forkJoin` - Can be called `final destination operator` because if our observables are not complete that means `.next()` can complete for `forkJoin` just `.complete()` in our observables can complete with this guy;

### Exercises explained (pt-br):

1. Chame dois serviços HTTP em paralelo utilizando o operador ZIP. Chame dois serviços HTTP em paralelo utilizando o operador forkJoin. Qual a diferença entre os dois? Fechar observable

2. Crie um component pai Crie um component filho Consuma o observable no componente filho getMultiValueObservable counter.service dando console.log no valor que vier
   Crie um botão no component pai que a cada clique alterna entre mostrar o component filho e esconder o component filho, utilize ngIf pra isso O que acontece com o console.log? Resolva o problema

3. Consuma um getAll que retorne um observable com N instâncias de uma classe. Crie a classe pra essa instância também.

4. Crie um serviço que utilize Subject, depois mude para Behavior e por ultimo use o replaySubject pra ver e entender a diferença entre eles
