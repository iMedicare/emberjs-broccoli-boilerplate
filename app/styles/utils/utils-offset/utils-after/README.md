# SUIT CSS utilities: after

![Build Status](https://secure.travis-ci.org/suitcss/utils-after.png?branch=master)](http://travis-ci.org/suitcss/utils-after)

SUIT CSS trailing offset utilities.

Read more about [SUIT CSS's design principles](https://github.com/suitcss/suit/).

## Installation

* [npm](http://npmjs.org/): `npm install suitcss-utils-after`
* [Component(1)](http://component.io/): `component install suitcss/utils-after`
* [Bower](http://bower.io/): `bower install suit-utils-after`
* Download: [zip](https://github.com/suitcss/utils-after/zipball/master)

## Available classes

* `u-afterXofY` (numerous) - Specify the proportional offset before an object.

`X` must be an integer less than `Y`.

`Y` can be any of the following numbers: 2, 3, 4, 5, 6, 8, 10, 12.

### Plugins

Utilities that can be limited to specific Media Query breakpoints.

* `u-sm-afterXofY` - To use at the smallest Media Query breakpoint.
* `u-md-afterXofY` - To use at the medium Media Query breakpoint.
* `u-lg-afterXofY` - To use at the large Media Query breakpoint.

## Usage

Please refer to the README for [SUIT CSS utils](https://github.com/suitcss/utils/)

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

* Google Chrome (latest)
* Opera (latest)
* Firefox 4+
* Safari 5+
* Internet Explorer 8+
