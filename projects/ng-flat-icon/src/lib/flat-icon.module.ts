import {ModuleWithProviders, NgModule, Type} from "@angular/core";
import {FlatIconService} from "./services/flat-icon.service";
import {FlatIconOptions} from "./interfaces/flat-icon-options.interface";
import {FLAT_ICON_OPTIONS} from "./flat-icon.constant";
import {FlatIconDirective} from "./directives/flat-icon.directive";

const declarations: Type<any>[] = [
  FlatIconDirective,
];

@NgModule({
  declarations: declarations,
  exports: declarations,
})
export class FlatIconModule {
  static forRoot(options?: Partial<FlatIconOptions>): ModuleWithProviders<FlatIconModule> {
    return {
      ngModule: FlatIconModule,
      providers: [
        { provide: FLAT_ICON_OPTIONS, useValue: options || {} },
        FlatIconService,
      ],
    }
  }
}
