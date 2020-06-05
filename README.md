# BubbleSets for JavaScript

[![NPM Package][npm-image]][npm-url] [![Github Actions][github-actions-image]][github-actions-url]

Fork of http://github.com/josuakrause/bubblesets-js/ - a JavaScript implementation of Christopher Collins' [bubble sets](http://vialab.science.uoit.ca/portfolio/bubblesets) without the use of external libraries.
A Java implementation can be found [here](https://github.com/JosuaKrause/Bubble-Sets).

![bubblesets](https://user-images.githubusercontent.com/4129778/83879077-60607800-a73d-11ea-9d1d-4f76752280ee.png)

## Install

```sh
npm install --save bubblesets-js
```

## Usage

```js
const bubbleSets = new BubbleSets.BubbleSets();
bubbleSets.pushMember(BubbleSets.rect(0, 0, 50, 20));
bubbleSets.pushMember(BubbleSets.rect(200, 100, 50, 20));
bubbleSets.pushMember(BubbleSets.circle(240, 40, 10));

const pointPath = bubbleSets.compute();
const cleanPath = pointPath.simplify(0).bSplines().simplify(0);

const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 200;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// svg path
//const path = document.createElement('path');
//path.setAttribute('d', cleanPath.toString());

// canvas
ctx.beginPath();
bubbleSets.drawMembers(ctx);
ctx.fillStyle = 'steelblue';
ctx.fill();
ctx.beginPath();
cleanPath.draw(ctx);
ctx.strokeStyle = 'black';
ctx.fillStyle = 'crimson';
ctx.fill();
ctx.stroke();
```

![sample](https://user-images.githubusercontent.com/4129778/83879033-52aaf280-a73d-11ea-9a19-d803718fec17.png)

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
[npm-url]: https://npmjs.org/package/bubblesets-js
[github-actions-image]: https://github.com/sgratzl/bubblesets-js/workflows/ci/badge.svg
[github-actions-url]: https://github.com/sgratzl/bubblesets-js/actions
[codepen]: https://img.shields.io/badge/CodePen-open-blue?logo=codepen
