# Single SPA playground

## Overview

O setup recomendado pela equipe do SingleSPA é utilizar in-browser ES modules + import maps (ou SystemJS para polyfill e permitir um suporte a maiores browsers). Esse setup tem algumas vantagens

- Bibliotecas comuns são faceis de manter, já que são baixadas apenas uma vez. Se utilizar SystemJS podemos pré carregar as bibliotecas para mais velocidade também.
- Compartilhar código, funções, variáves é fácil como importar/exportar, como em uma aplicação monilitica.
- Lazy loading é simples, isso ajuda no carremento inicial das aplicações
- Cada aplicação, pode ser desenvolvida de forma independente e deployada de forma independente.
- A experiencia de dev é muito boa, pois para carregar cada MFE é apenas alterar o import maps relativo a cada um.

## In-browser versus build-time modules

Os módulos javascript in-browser quando são importados/exportados não são compilados pela ferramenta de build, invés disso são resolvidas pelo próprio browser. Isso é diferente de módulos em tempo de build (build-time), esses são disponibilizados via node_moduleos e compilados antes de chegar no browser

A forma de informar o webpack ou rollup para deixar algumas dependencias não compiladas durante o build, para as mesmas virem pelo browser são:

- [Webpack externals](https://webpack.js.org/configuration/externals/#root)
- [Rollup externals](https://rollupjs.org/configuration-options/#external)

Recomendações da equipe do SingleSPA

1. Cada aplicação single-spa deve ter um módulo in-browser
2. Cada dependencia grande que seja compartilhada (react, vue or angular) deve estar no módulo browser
3. Todo o resto deve estar no módulo de build-time

## Links

- [Setup recomendado](https://single-spa.js.org/docs/recommended-setup/)
