# Help Wanted Guide

## Misc

  - the first contributions are thru `pull requests` - we will give you the ability to push to the repo directly as soon as we will be sure we are on the same page
  - start `feature branch` from `dev` branch for something you want to add
  - Read [#development](https://github.com/legomushroom/mojs-timeline-editor/blob/master/readme.md#development) guides if you struggle to install the repo locally.
  - `2 spaces` identation
  - the best way to get answer - comment on the `help wanted` issue, we will discuss it right there, you can also ask something on `slack` channel
  - do not hesitate to ask something, we always want to help you

## CSS

  - we use `postcss`
  - all colors are in [colors.postcss.css](https://github.com/legomushroom/mojs-timeline-editor/blob/master/app/css/assets/colors.postcss.css), use only those
  - all sizes should be expressed relative to `$PX` variable e.g. `width: 20*$PX; margin-left: 30*$PX`
  - all font sizes should be expressed relative to `$FPX` (font px) variable e.g. `font-size: 20*$FPX;`
  - to use `colors` and `$PX` variables you need to `@import '../assets/globals.postcss.css';`, please refer to [icon.postcss.css](https://github.com/legomushroom/mojs-timeline-editor/blob/master/app/css/blocks/icon.postcss.css) for more info
  - save component's css file to [blocks](https://github.com/legomushroom/mojs-timeline-editor/tree/master/app/css/blocks) folder

## JS

  - we use [PReact](https://preactjs.com/) instead of `React`, but no worries, it has exact the same syntax and APIs as `React` has.
  - you need to `import { h } from 'preact';` in order for `preact` to work, please refer to [icon.babel.jsx](https://github.com/legomushroom/mojs-timeline-editor/blob/master/app/js/components/icon.babel.jsx) for more info
  - we use `babel` and `stage 0` preset
  - all components are stored in [components](https://github.com/legomushroom/mojs-timeline-editor/tree/master/app/js/components) folder and have `babel.jsx` postfix
  - we use `css modules` for `CSS`, every time you save the `postcss.css` file, it's `JSON` representation will be generated and placed near the `postcss.css` file, you need to read the `CSS` class name hash and apply it to the component, [icon.babel.jsx](https://github.com/legomushroom/mojs-timeline-editor/blob/master/app/js/components/icon.babel.jsx) for more info **(lines 2,3 and 10)**
  - we use [hammerjs](http://hammerjs.github.io/) for unify pointer input, `drag`/`pan`, `tap` etc.
  - unify `pointer-down`/`pointer-up` events by using [add-pointer-down](https://github.com/legomushroom/mojs-timeline-editor/blob/master/app/js/components/add-pointer-down.babel.js)/[add-pointer-up](https://github.com/legomushroom/mojs-timeline-editor/blob/master/app/js/components/add-pointer-up.babel.js) from [helpers](https://github.com/legomushroom/mojs-timeline-editor/tree/master/app/js/helpers)

*Cheers!*
