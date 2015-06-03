# SUIT CSS base

Base styles for web applications. Provides a thin layer on top of
[Normalize.css](https://github.com/necolas/normalize.css). Removes default
margins and exposes variables for theming.

Read more about how to use [SUIT CSS](https://github.com/suitcss/suit/).

## Installation

* [npm](http://npmjs.org/): `npm install suitcss-base`
* [Component(1)](http://github.com/component/component): `component install suitcss/base`
* [Bower](http://bower.io/): `bower install suit-base`
* [Download](https://github.com/suitcss/base/releases)

## Configurable variables

* `--base-background`: the application background style.
* `--base-color`: the root text color.
* `--base-font`: the root font style.
* `--base-link-color`: the root link color.
* `--base-link-color-hover`: the root link interaction (`:hover`, `:focus`,
  `:active`) color.

## Testing

Install [Node](http://nodejs.org) (comes with npm).

```
npm install
```

To generate a build:

```
npm run build
```

To generate the testing build.

```
npm run build-test
```

Basic visual tests are in `test/index.html`.

## Browser support

* Google Chrome
* Firefox
* Safari
* Opera
* Internet Explorer 8+
