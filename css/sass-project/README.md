# SASS

## How install and run

- `npm install` for install all dependencies;
- `npm run sass:build` to build all sass to css;
- `npm run sass:watch` to build and watch for change on sass;

## Useful information

- CSS preprocessor
- Permits add logic and structures
- Preprocessors are programs that allow you to generate CSS from a certain syntax. There are several preprocessors, most of which allow you to add functions that are not possible in pure CSS, such as mixins, nesting, selectors, inheritance, etc.
- The main preprocessors are **Sass**, **Less** and **Stylus**, but there are smaller ones as well. They all do similar things, with some quirks and their own syntax.
- Sass, one of the most popular and also the oldest, created in 2006. Sass stands for _Syntactically Awesome Style Sheets_, and was written in Ruby. The second pre-processor mentioned is LESS, which was created 3 years after Sass, in 2009, inspired by Sass, and written in JavaScript. And the last pre-processor mentioned is the Stylus, which was released right after Less in 2010, influenced by the previous two, was written in Node.js and combines features of Sass and Less.
- Sass variable interpolation: use when you need a variable value inside a CSS function or a name that can vary.
  - Usage: `calc(100% - $myvariable)`
- Placeholder selector `%myplaceholder`
  - This selector is not compiled and need to be extended usage:
    - ```
      .example-class {
        @extend %myplaceholder;
      }
      ```
- Mixins: mixins are a blocks of style for prevent repetition, we can use like a simple style and like a function with parameters
  - ```
    @mixin reset-list {
      margin: 0;
      padding: 0;
      list-style: none;
    }


    @mixin flx($property, $alignment) {
      display: flex;
      #{$property}: $alignment;
    }
    ```
- Using an underscore for name our sass file, means the file actualy is not been compiled by sass, called by partial too.

Most of the extra Sass functions come in the At rules format, and in this class we saw some examples like mixins, function, import, extend and include, but there are several At Rules:

`@use`: loads mixins, functions and variables from other Sass stylesheets and combines CSS from several stylesheets together.

`@forward`: loads a Sass stylesheet and makes mixins, functions and variables available when the stylesheet is loaded by the `@use` rule.

`@import`: extends CSS rules for loading styles, mixins, functions and variables from other stylesheets.

`@mixins` and `@include`: make it easy to reuse code snippets.

`@function`: defines custom functions that can be used in expressions.

`@extend`: allows selectors to inherit styles from each other.

`@at`-root: puts styles inside it in the CSS document root.

`@error`: causes the build to fail with an error message.

`@warn`: prints a warning without completely stopping compilation.

`@debug`: print a message for debugging purposes.

And also control flows like: `@if`, `@each`, `@for` and `@while`..

## Useful links

- [What is BEM? And Why you should use it in your project.](https://medium.com/@dannyhuang_75970/what-is-bem-and-why-you-should-use-it-in-your-project-ab37c6d10b79)
