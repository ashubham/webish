![](https://github.com/ashubham/markee/raw/master/assets/webish.gif)

# Webish
Visual SVG web of connected draggable components.
[![Build Status](https://travis-ci.org/ashubham/webish.svg?branch=master)](https://travis-ci.org/ashubham/webish)
[![npm version](https://badge.fury.io/js/webish.svg)](https://badge.fury.io/js/webish)

- [Demo](https://codepen.io/ashubham/pen/dmoQyv)

## Features
- Super Lightweight (400B compressed)
- Uses SVG web for performance.
- Pure Javascript (Uses No JQuery or Frameworks).
    - But can be used with any.
- Typescript (Types included).
- Fully customizable using CSS.
- Works in Chrome, Safari, IE, Firefox.

## Usage
```html
<div id=container>
    <div class=box id=e1></div>
    <div class=box id=e2></div>
    <div class=long-box id=e3></div>
</div>
```
```javascript
import Webish from 'webish';

let container = document.getElementById('container');
let web = new Webish(container /* containerEl */, [
    
    // Array of the connected components, with the direction of connection.
    // The components would be connected clockwise in order.
    {node: document.getElementById('e1'), direction: 'bottom'},
    {node: document.getElementById('e2'), direction: 'right'},
    {node: document.getElementById('e3'), direction: 'top'}
]);
```
```css
.webish-connector {
	fill: rgba(0, 0, 255, 0.1); // Color of the web
}
```