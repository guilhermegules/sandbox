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

#### Updating slots

**The browser monitors slots and updates the rendering if slotted elements are added/removed.**

> On custom menu component

1. At initialization:
   1. `slotchange: title` triggers immediately, as the `slot="title"` from the light DOM gets into the corresponding slot.
2. After 1 second:
   1. `slotchange: item` triggers, when a new `<li slot="item">` is added

### Slot API

> JavaScript slot related methods

JavaScript looks at the "real" DOM, without flattening. But, if the shadow tree has `{ mode: 'open' }`, then we can figure out which elements assigned to a slot and, vise-versa, the slot by the element inside it:

- `node.assignedSlot` - returns the `<slot>` element that the `node` is assigned to
- `slot.assignedNodes({ flatten: true/false })` - DOM nodes, assigned to the slot. The `flatten` option is `false` by default. If explicitly set to `true`, then it looks more deeply into the flatted DOM, return nested slots in case of nested components and the fallback content if no node is assigned.
- `slot.assignedElements({ flatten: true/false })` - DOM elements, assigned to the slot (same as above, but only element nodes)

### Shadow DOM and events

The idea behind shadow tree is to encapsulate internal implementation details of a component.

Let’s say, a click event happens inside a shadow DOM of `<user-card>` component. But scripts in the main document have no idea about the shadow DOM internals, especially if the component comes from a 3rd-party library.

So, to keep the details encapsulated, the browser re-targets the event.

Events that happen in shadow DOM have the host element as the target, when caught outside of the component.

**:warning: Shadow tree details are only provided for `{ mode:'open' }` trees**

If the shadow tree was created with `{ mode: 'closed'}`, then the composed path starts from the host: `user-card` and upwards.

That’s the similar principle as for other methods that work with shadow DOM. Internals of closed trees are completely hidden.

## Useful links

- [Custom elements html spec](https://html.spec.whatwg.org/#custom-elements)
- [Custom Elements](https://caniuse.com/custom-elementsv1)
- [Dispatching custom events](https://javascript.info/dispatch-events)
- [Shadow tree](https://dom.spec.whatwg.org/#shadow-trees)
