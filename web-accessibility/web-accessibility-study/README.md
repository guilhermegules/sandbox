# WEB accessibility

> **Acessibilidade não é caridade, é empatia.**

[Protótipo apeperia](<https://www.figma.com/file/9L4RrtcmVe4ldyvHMcyUy8/Apeperia-(projeto-inicial)?node-id=0%3A170>)

## Acessibilidade antes de codar

- 25% da população do Brasil têm alguma deficiencia -> 45.000.000 IBGE 2010
- Termo correto atualmente PcD = Pessoa com deficiêcia
- [WCAG - Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)
- Lembre-se de pontos como (público autista):
  - evitar figuras de linguagem;
  - contraste de cores mais suave;
  - elementos da UI (user interface) mais intuitivos com uma boa affordance
  - [O que é Affordance e como projetar pensando nisso](https://www.homemmaquina.com.br/o-que-e-affordance/)
- Lembre-se de pontos como (público com dislexia):
  - evitar textos muito longos;
  - remover sublinhados e textos inteiros em caixa alta;
  - oferecer correções automáticas ou sugestões.
- Lembre-se de pontos como (público com baixa visão):
  - tomar cuidado com a contraste das cores;
  - evitar fontes muito pequenas;
  - evitar passar informações apenas por cor.
- Lembre-se de pontos como (público PCD):
  - Elementos mais fáceis de serem acertados;
  - Evitar alertas aleátorios;
  - Fornecer atalhos.

## Anotações projeto

Uso do leitor de tela:

Que pessoas cegas ou com baixa visão podem contar com o auxílio de um software que lê o conteúdo exibido na tela, estes recebem o nome de leitores de tela.

**Usando o [NVDA](https://www.nvaccess.org/):**

Vimos, configuramos e aprendemos atalhos do NVDA, leitor de tela escolhido para testar o projeto Apeperia, a fim de deixar seu uso em testes menos maçante para quem não está acostumado com a ferramenta. E também habilitamos seu "exibidor de tela" para não dependermos de ouvir sua leitura.
Semântica no HTML:

Tomar cuidado com a marcação de conteúdo quando estamos utilizando elementos HTML5. Vale mais por uma `<div>` do que usar um `<aside>` ou `<details>` erroneamente.

**Testes, testes, testes:**

O melhor caminho para deixar nosso projeto inclusivo não é apenas seguir regras e guidelines, mas testá-las por conta para começarmos a compreender os caminhos e dificuldades que muitas pessoas podem ter ao usar nosso produto e/ou serviço. Empatia.

Lembre-se de pontos como:

- Evitar mais de um `<h1>` na página;
- Usar HTML5 semântico que faça sentido;
- `alt` nas imagens que possuem função de conteúdo;
- Escrever o `alt` de maneira descritiva, evitando redundâncias;
- Configurar o idioma principal do documento com o atributo lang;
- Colocar o elemento `<title>` em SVGs que forem inline (código direto no HTML).
- Evitar utilizar `display: none` ou `visibility: hidden` pois essas propriedades escondem os elementos dos leitores de tela
- Sempre devemos usar devidamente uma `<label>` para cada campo em um formulário. Lembrando de atrelá-los com os atributos for e id
- Evitar bloquear o zoom do usuário
- Em videos priorizar utilização de legendas ou utilizar um embedded

## Links úteis

- [Terminologias atuais para falar sobre deficiência](https://desculpenaoouvi.com.br/terminologias-atuais-para-falar-sobre-deficiencia/)
- [Gaia wiki](https://gaia.wiki.br/)
- [About Gaia](https://gaia.wiki.br/sobre/)
- [Desculpe, não ouvi!](https://desculpenaoouvi.com.br/)
- [Curso Libras EaD USP - Apresentação](https://eaulas.usp.br/portal/video.action?idItem=6540)
- [Você sabe o que é Surdez? | Nerdologia](https://www.youtube.com/watch?v=bubbJSVJFRs)
- [Simulador de leitura dislexa](http://data.qz.com/2016/dyslexia/)
- [Do’s And Don’ts Of Designing For Users With Dyslexia](https://www.designmantic.com/blog/infographics/designing-for-users-dyslexia/)
- [Fonte grátis projetada contra alguns sintomas comuns da dislexia - OpenDyslexic](https://opendyslexic.org/)
- [WCAG - Contrast Checker](https://contrastchecker.com/)
- [Browsealoud plugin para auxiliar na acessibilidade](https://www.texthelp.com/en-gb/products/reachdeck/browsealoud-is-now-the-reachdeck-toolbar/)
- [Prêmio nacional de acessibililidade na Web](http://premio.ceweb.br/)
- [Invisible Content Just for Screen Reader Users](https://webaim.org/techniques/css/invisiblecontent/)
- [Using ARIA](https://www.w3.org/TR/using-aria/#intro)
- [Basic screen reader commands for accessibility testing](https://www.tpgi.com/basic-screen-reader-commands-for-accessibility-testing/)
- [Lista com as roles existentes (inglês)](https://www.w3.org/TR/wai-aria/)
- [Accessibility Patterns for the Web eBay](http://ebay.github.io/mindpatterns/)
- [How to create a more accessible modal W3C](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal)
- [Modal Dialog Example W3C](https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html)
- [Carousel working example w3c](https://www.w3.org/WAI/tutorials/carousels/working-example/)
- [Should I use a carousel](https://shouldiuseacarousel.com/)
- [Set custom validity function](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/setCustomValidity)
- [A11Y Style Guide](https://a11y-style-guide.com/style-guide/)
- [Você sabia que a acessibilidade pode levar seu site ao topo do Google?](https://blog.handtalk.me/acessibilidade-ranking-google/)
