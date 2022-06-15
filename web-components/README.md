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

There are two limitations

1. We can create only one shadow root per element
2. The element must be either a custom element or one of `article`, `aside`, `blockquote`, `body`, `div`, `footer`, `h1…h6`, `header`, `main` `nav`, `p`, `section`, or `span`. Other elements, like `<img/>`, can't host shadow tree.

The `mode` option sets the encapsulation level. It must have any of two values:

- `open` - the shadow root is available as `element.shadowRoot`
- `closed` - `element.shadowRoot` is always null

We can only access the shadow DOM by the reference returned by attachShadow (and probably hidden inside a class). Browser-native shadow trees, such as `<input type="range">`, are closed. There’s no way to access them.

### Template element

A built-in `<template>` element serves as a storage for HTML markup templates. The browser ignores its contents, only checks for syntax validity, but we can access and use it in JavaScript, to create other elements.

- template content can be any syntactically connect HTML
- template content is considered out of the document, so it doesn't affect anything
- we can access `template.content` from JS, clone it to reuse in a new component

### Shadow DOM slots, composition

Many types of components, such as tabs, menus, image galleries, and so on, need the content to render.

How to implement it?

We could try to analyze the element content and dynamically copy-rearrange DOM nodes. That’s possible, but if we’re moving elements to shadow DOM, then CSS styles from the document do not apply in there, so the visual styling may be lost. Also that requires some coding.

Luckily, we don’t have to. Shadow DOM supports `<slot>` elements, that are automatically filled by the content from light DOM.

## Useful links

- [Custom elements html spec](https://html.spec.whatwg.org/#custom-elements)
- [Custom Elements](https://caniuse.com/custom-elementsv1)
- [Dispatching custom events](https://javascript.info/dispatch-events)
- [Shadow tree](https://dom.spec.whatwg.org/#shadow-trees)
