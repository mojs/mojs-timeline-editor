# mojs timeline-editor

<img width="444" src="https://github.com/legomushroom/mojs-timeline-editor/blob/master/mockups/timeline-editor.png?raw=true" alt="mojs-timeline-editor" />

`MojsTimelineEditor` is a GUI plugin for interactive `custom easings`/`property curves` editing while crafting your animations. Part of `mojs` tools.

## Installation

The `MojsTimelineEditor` depends on `mojs >= 0.225.2`, tween autoupdates available for `mojs >= 0.276.2`. Please make sure you've linked [mojs](https://github.com/legomushroom/mojs) library first.

[CDN](https://www.jsdelivr.com/)(pending approval):

```
<script src="//cdn.jsdelivr.net/mojs-timeline-editor/latest/mojs-timeline-editor.min.js"></script>
```

[NPM](https://www.npmjs.com/):

```
[sudo] npm install mojs-timeline-editor
```

[Bower](http://bower.io/):

```
bower install mojs-timeline-editor
```

Import `MojsTimelineEditor` constructor to your code (depends on your environment) :

```javascript
const MojsTimelineEditor = require('mojs-player').default;
// or
import MojsTimelineEditor from 'mojs-player';
```

If you installed it with script link - you should have `MojsTimelineEditor` global.

## Usage

Usage section.

## Shortcuts

Shortcuts.

## Development

Install [webpack](https://webpack.github.io/) globally:

```
[sudo] npm install webpack -g
```

Install dependencies with [npm](https://www.npmjs.com/):

```
[sudo] npm install
```

Run [webpack](https://webpack.github.io/):

```
webpack
```

Please make sure you started a `feature branch` with the `feature name` (better from the `dev` branch) before making changes.

## License

(The MIT License)

Copyright (c) Oleg Solomka [@LegoMushroom](https://twitter.com/legomushroom) [legomushroom@gmail.com](mailto:legomushroom@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.