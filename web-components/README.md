# web-components-poc

Study about web components, trade offs and examples

## Custom elements

We can create custom HTML element, described by a class, with its own methods, properties, events and so on.

Also we can use an custom elements inside the other

There are two kinds of custom elements:

1. **Autonomous custom elements** - all new elements, extending the abstract `HTMLElement` class
2. **Customized built-in elements** - extending built-in elements, like a customized button, based on `HTMLButtonElement` etc.

## Shadow DOM

Shadow Dom elements, have their own ids space, they are so invisible to JavaScript selectors from the main document, such as `querySelector` and use the styles only from the shadow tree and not from the main document

### Shadow tree

A DOM element can have two types of DOM subtrees:

1. Light tree - a regular DOM subtree, made of HTML children
2. Shadow tree - a hidden DOM subtree, not reflected in HTML

### Template element

A built-in `<template>` element serves as a storage for HTML markup templates. The browser ignores its contents, only checks for syntax validity, but we can access and use it in JavaScript, to create other elements.

- template content can be any syntactically connect HTML
- template content is considered out of the document, so it doesn't affect anything
- we can access `template.content` from JS, clone it to reuse in a new component

## Useful links

- [Custom elements html spec](https://html.spec.whatwg.org/#custom-elements)
- [Custom Elements](https://caniuse.com/custom-elementsv1)
- [Dispatching custom events](https://javascript.info/dispatch-events)
- [Shadow tree](https://dom.spec.whatwg.org/#shadow-trees)
