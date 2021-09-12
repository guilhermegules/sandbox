# Angular Accessibility

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## NG_VALUE_ACCESSOR

- É um injection token que marca nosso componente para que seja injetado dentra da infraestrutura do FormGroup.

## forwardRef

- É usado quando o token ao qual precisamos nos referir para fins de DI é declarado, mas ainda não definido.

## @ContentChildren

- Usado para obter uma `QueryList` de elementos ou diretivas do conteúdo DOM. Sempre que um elemento filho é adicionado, removido ou movido, a lista de consulta será atualizada e as alterações observáveis ​​na lista de consulta emitirão um novo valor.

## Elementos disabled

- O elemento é completamente ignorado por screen readers, inclusive não pode receber foco através do teclado. **Dica**: se você precisa de um botão que esteja desabilitado mas que ainda possa ganhar foco, utilize o atributo `aria-disabled`. Screen readers irão anunciar o elemento como disabled, mas lembre-se: você precisará garantir que a ação do botão só seja disparada quando ele estiver habilitado novamente, geralmente no método chamado pelo botão.

## NgControl

- Injetando um `ngControl` no construtor de uma diretiva, temos acesso ao form control do form group utilizado, dessa forma conseguimos fazer as manipulações necessárias.
