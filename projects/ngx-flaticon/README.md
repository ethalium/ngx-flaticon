<p align="center" style="font-size: 40px;">Angular Directives for <a href="https://www.flaticon.com/" target="_blank">FlatIcon</a></p>

<p align="center">
    <a href="https://www.npmjs.com/package/@ethalium/ngx-flaticon" target="_blank"><img src="https://img.shields.io/npm/v/@ethalium/ngx-flaticon.svg" alt="NPM Version" /></a>
    <a href="https://www.npmjs.com/package/@ethalium/ngx-flaticon" target="_blank"><img src="https://img.shields.io/npm/l/@ethalium/ngx-flaticon.svg" alt="Package License" /></a>
    <a href="https://www.npmjs.com/package/@ethalium/ngx-flaticon" target="_blank"><img src="https://img.shields.io/npm/dm/@ethalium/ngx-flaticon.svg" alt="NPM Downloads" /></a>
    <a href="https://www.npmjs.com/package/@ethalium/ngx-flaticon" target="_blank"><img src="https://img.shields.io/bundlephobia/min/@ethalium/ngx-flaticon?label=size" alt="Package Size" /></a>
</p>

![ngx-flaticon](https://raw.githubusercontent.com/ethalium/ngx-flaticon/main/preview.png "ngx-flaticon preview")

## Installation
`npm i @ethalium/ngx-flaticon`

## Usage

---

### Version Convention:
The version of this package reflects the version of FlatIcons.

### Styles:
Import the `FlatIcon` Stylesheet from the package assets or download the sources from <a href="https://github.com/ethalium/ngx-flaticon/tree/main/projects/ngx-flaticon/assets" target="_blank">Github</a>.

```scss
@import "@ethalium/ngx-flaticon/assets/flat-icons";
```

#
### Module:
Import `FlatIconModule` from `@ethalium/ngx-flaticon`

```typescript
import { FlatIconModule } from '@ethalium/ngx-flaticon';

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
<fi
  [name]="'spinner'"
  [family]="'rounded'"
  [weight]="'bold'"
  [color]="'#000000'"
></fi>
```

##
## Attribution:

---
Make sure to ``attribute the owner`` of the icons according to the [FlatIcon Attribution Guide](https://support.flaticon.com/s/article/Attribution-How-when-and-where-FI?language=en_US). If you're a Premium user, you do not need to attribute the owner.
