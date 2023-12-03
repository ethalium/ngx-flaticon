<p align="center" style="font-size: 40px;">Angular Directives for <a href="https://www.flaticon.com/" target="_blank">FlatIcon</a></p>

<p align="center">
    <a href="https://www.npmjs.com/package/@fusoionic/ng-flaticon" target="_blank"><img src="https://img.shields.io/npm/v/@fusoionic/ng-flaticon.svg" alt="NPM Version" /></a>
    <a href="https://www.npmjs.com/package/@fusoionic/ng-flaticon" target="_blank"><img src="https://img.shields.io/npm/l/@fusoionic/ng-flaticon.svg" alt="Package License" /></a>
    <a href="https://www.npmjs.com/package/@fusoionic/ng-flaticon" target="_blank"><img src="https://img.shields.io/npm/dm/@fusoionic/ng-flaticon.svg" alt="NPM Downloads" /></a>
    <a href="https://www.npmjs.com/package/@fusoionic/ng-flaticon" target="_blank"><img src="https://img.shields.io/bundlephobia/min/@fusoionic/ng-flaticon?label=size" alt="Package Size" /></a>
</p>

![ng-flaticon](https://raw.githubusercontent.com/fusoionic/ng-flaticon/main/preview.png "ng-flaticon preview")

## Installation
`npm i @fusoionic/ng-flaticon`

## Usage

---

#
### Styles:
Import the `FlatIcon` Stylesheet from the package assets or download the sources from <a href="https://github.com/fusoionic/ng-flaticon/tree/main/projects/ng-flaticon/assets" target="_blank">Github</a>.

```scss
@import "@fusoionic/ng-flaticon/assets/flat-icons";
```

#
### Module:
Import `FlatIconModule` from `@fusoionic/ng-flaticon`

```typescript
import { FlatIconModule } from '@fusoionic/ng-flaticon';

@NgModule({
  imports: [
    FlatIconModule.forRoot({ ... }), // inject services
    FlatIconModule, // inject directives
  ]
})
```

#
### Directive:
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

##
## Attribution:

---
Make sure to ``attribute the owner`` of the icons according to the [FlatIcon Attribution Guide](https://support.flaticon.com/s/article/Attribution-How-when-and-where-FI?language=en_US). If you're a Premium user, you do not need to attribute the owner.
