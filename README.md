# BubbleSets for JavaScript

[![NPM Package][npm-image]][npm-url] [![Github Actions][github-actions-image]][github-actions-url]

Fork of http://github.com/josuakrause/bubblesets-js/ - a JavaScript implementation of Christopher Collins' [bubble sets](http://vialab.science.uoit.ca/portfolio/bubblesets)
without the use of external libraries. A Java implementation can be found [here](https://github.com/JosuaKrause/Bubble-Sets).

## Install

```sh
npm install --save bubblesets-js
```

## Usage

see [Samples](https://github.com/sgratzl/bubblesets-js/tree/master/samples) on Github

or at this [![Open in CodePen][codepen]](https://codepen.io/sgratzl/pen/TODO)

## Development Environment

```sh
npm i -g yarn
yarn set version 2
cat .yarnrc_patch.yml >> .yarnrc.yml
yarn
yarn pnpify --sdk
```

### Common commands

```sh
yarn compile
yarn test
yarn lint
yarn fix
yarn build
yarn docs
yarn release
yarn release:pre
```

[npm-image]: https://badge.fury.io/js/bubblesets-js.svg
[npm-url]: https://npmjs.org/package/sgratzl/bubblesets-js
[github-actions-image]: https://github.com/sgratzl/bubblesets-js/workflows/nodeci/badge.svg
[github-actions-url]: https://github.com/sgratzl/bubblesets-js/actions
[codepen]: https://img.shields.io/badge/CodePen-open-blue?logo=codepen