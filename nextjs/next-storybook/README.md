# Storybook e React: Documentando front end

O Storybook é uma ferramenta de código aberto para criar componentes de interface do usuário (UI) e páginas isoladamente. Ela simplifica o desenvolvimento, o teste e a documentação dessas interfaces do usuário.

O Storybook reúne interfaces de usuário, exemplos e documentação em um só lugar. Isso ajuda o time a utilizar padrões de interface de usuário que já existem. Se tornou bastante popular e atualmente conta com milhares de usuários, e sustenta o fluxo de trabalho de Front-end da Netflix, Microsoft, Shopify, por exemplo.

Com o Storybook é possível visualizar como as interfaces de usuário funcionam e não como deveriam funcionar. Isso facilita a coleta de feedbacks e reproduções.

- [Storybook Get Started](https://storybook.js.org/docs/react/get-started/install)
- [Storybook 7.0 design sneak peek](https://storybook.js.org/blog/storybook-7-0-design-sneak-peek/)

## JSX em Markdown

Com os arquivos `.mdx` você é capaz de importar componentes por meio de JSX e incorporá-los ao seu conteúdo. Eles são compilados para JavaScript e você pode usar em qualquer estrutura que suporte JSX. De forma simples, o MDX pode ser explicado como um formato que combina o markdown e o JSX e tem a seguinte aparência:

```mdx
# Hello, world!

<div className="nota">Alguma nota aqui…</div>
```

Neste exemplo, os títulos e marcações são escritos em markdown, enquanto que a <div> é a parte do JSX. Nesse exemplo temos um className pois foi escrito com React. Os arquivos MDX são rápidos, pois não tem tempo de execução e toda compilação ocorre no estágio de construção. É personalizável, pois você pode decidir qual componente é renderizado.

- [MDX.com](https://mdxjs.com/)
- [Mdx playground](https://mdxjs.com/playground/)
- [Code integrations](https://storybook.js.org/integrations/tag/code)
- [The 5 Best Addons for Building Accessible React Components in Storybook](https://dev.to/kathryngrayson/the-5-best-addons-for-building-accessible-components-in-storybook-210l)
