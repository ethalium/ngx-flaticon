<p align="center" style="font-size: 40px;">Angular Directives for <a href="https://www.flaticon.com/" target="_blank">FlatIcon</a></p>

<p align="center">
    <a href="https://www.npmjs.com/package/@fusoionic/ng-flat-icon" target="_blank"><img src="https://img.shields.io/npm/v/@fusoionic/ng-flat-icon.svg" alt="NPM Version" /></a>
    <a href="https://www.npmjs.com/package/@fusoionic/ng-flat-icon" target="_blank"><img src="https://img.shields.io/npm/l/@fusoionic/ng-flat-icon.svg" alt="Package License" /></a>
    <a href="https://www.npmjs.com/package/@fusoionic/ng-flat-icon" target="_blank"><img src="https://img.shields.io/npm/dm/@fusoionic/ng-flat-icon.svg" alt="NPM Downloads" /></a>
    <a href="https://www.npmjs.com/package/@fusoionic/ng-flat-icon" target="_blank"><img src="https://img.shields.io/bundlephobia/min/@fusoionic/ng-flat-icon?label=size" alt="Package Size" /></a>
</p>

![ng-flat-icon](https://raw.githubusercontent.com/fusoionic/ng-flat-icon/main/preview.jpg "ng-flat-icon preview")

## Installation
`npm i @fusoionic/ng-flat-icon`

## Usage

---

#
### Styles:
Import the `FlatIcon` Stylesheet from the package assets or download the sources from <a href="https://github.com/fusoionic/ng-flat-icon/tree/main/projects/ng-flat-icon/assets" target="_blank">Github</a>.

```scss
@import "@fusoionic/ng-flat-icon/assets/flat-icons";
```

#
### Module:
Import `FlatIconModule` from `@fusoionic/ng-flat-icon`

```typescript
import { FlatIconModule } from '@fusoionic/ng-flat-icon';

@NgModule({
  imports: [
    FlatIconModule.forRoot({ ... }), // inject services
    FlatIconModule, // inject directives
  ]
})
```

#
### FlatIcon directive
```html
<fi-icon
  [name]="'spinner'"
  [weight]="'bold'"
  [type]="'rounded'"
  [color]="'#000000'"
  [duration]="500"
  [delay]="0"
></fi-icon>
```
