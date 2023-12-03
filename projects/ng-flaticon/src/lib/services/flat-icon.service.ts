import {Inject, Injectable, Optional} from "@angular/core";
import {FLAT_ICON_OPTIONS} from "../flat-icon.constant";
import {FlatIconFindOneOptions, FlatIconFindOptions, FlatIconOptions} from "../interfaces/flat-icon-options.interface";
import {
  FlatIcon,
  FlatIconAnimation,
  FlatIconAnimationType,
  FlatIconDetailed,
  FlatIcons,
  FlatIconType,
  FlatIconWeight
} from "../interfaces/flat-icon.interface";
import {FLAT_ICONS} from "../data/flat-icon.data";
import {FLAT_ICON_ANIMATIONS} from "../data/flat-icon-animations.data";

export function getFlatIcon(options?: Partial<FlatIconOptions>) {
  return new FlatIconService(options);
}

@Injectable({ providedIn: 'root' })
export class FlatIconService {
  private _options!: FlatIconOptions;
  private _icons!: FlatIcons;

  constructor(
    @Optional() @Inject(FLAT_ICON_OPTIONS)
    private _moduleOptions?: Partial<FlatIconOptions>,
  ){}

  get options(): FlatIconOptions {
    if(!this._options){
      this._options = {
        defaultType: this._moduleOptions?.defaultType || 'rounded',
        defaultWeight: this._moduleOptions?.defaultWeight || 'regular',
      };
    }
    return this._options;
  }

  private get icons(): FlatIcons {
    if(!this._icons){

      // create icons object
      this._icons = {};

      // create icons
      Object.entries(FLAT_ICONS).map(([type, weights]) => {
        Object.entries(weights).map(([weight, icons]) => {
          Object.keys(icons).map(iconName => {
            const key = iconName.trim().toLowerCase();
            if(!this._icons[key]) {
              this._icons[key] = {
                name: iconName,
                className: '',
                types: [],
                weights: []
              };
            }
            const icon = this._icons[key] as FlatIconDetailed;
            if(!icon.types.includes(type as any)) icon.types.push(type as any);
            if(!icon.weights.includes(weight as any)) icon.weights.push(weight as any);
          });
        });
      });

      // set default className
      Object.values(this._icons).map(icon => {
        const types: FlatIconType[] = ['brands', this.options.defaultType, 'rounded', 'straight'];
        const weights: FlatIconWeight[] = [this.options.defaultWeight, 'regular', 'bold', 'solid'];
        icon.className = this.createIconClassName(
          icon.name,
          types.find(t => icon.types.includes(t)),
          weights.find(w => icon.weights.includes(w))
        );
      });

    }
    return this._icons;
  }

  private createIconClassName(name: string, type?: FlatIconType|null, weight?: FlatIconWeight|null): string {
    const types = { 'rounded': 'r', 'straight': 's' };
    const weights = { 'regular': 'r', 'bold': 'b', 'solid': 's' };
    if(type === 'brands'){
      return `fi-brands-${name}`;
    }
    return `fi-${weights[(weight || 'regular')]}${types[type || 'rounded']}-${name}`;
  }

  find(options?: Partial<FlatIconFindOptions>): FlatIconDetailed[] {

    // create options
    const opts: FlatIconFindOptions = {
      search: options?.search && typeof options?.search === 'string' ? options?.search ?.trim().toLowerCase() || null : null,
      types: Array.isArray(options?.types) ? options?.types || [] : [],
      weights: Array.isArray(options?.weights) ? options?.weights || [] : [],
      limit: options?.limit && typeof options?.limit === 'number' && options?.limit >= 0 ? options?.limit || 0 : 0,
    };

    // create array for icons
    const icons: FlatIconDetailed[] = [];

    // get icon keys
    const iconKeys = Object.keys(this.icons).filter(name => !opts.search || name.trim().toLowerCase().indexOf(opts.search.trim().toLowerCase()) !== -1);
    const iconExact = iconKeys.filter(n => opts.search && n.trim().toLowerCase() === opts.search.trim().toLowerCase());
    const iconSimilar = iconKeys.filter(n => !iconExact.includes(n));

    // find icons
    for(let key of [...iconExact, ...iconSimilar]){
      const icon = this.icons[key];
      if(opts.limit > 0 && icons.length >= opts.limit) break;
      if(opts.types.length > 0 && !opts.types.filter(t => icon.types.includes(t)).length) continue;
      if(!icon.types.includes('brands') && opts.weights.length > 0 && !opts.weights.filter(w => icon.weights.includes(w)).length) continue;
      icons.push(icon);
    }

    // return icons
    return icons;

  }

  findOne(name: string, options?: Partial<FlatIconFindOneOptions>): FlatIcon|null {

    // format options
    let [type, weight] = [
      options?.type || this.options.defaultType,
      options?.weight || this.options.defaultWeight
    ];

    // find icons
    const icons = this.find({
      search: name,
      //types: [type, 'brands'],
      //weights: [weight],
      //limit: 1,
    });

    // check if icon has been found
    if(!icons.length){
      return null;
    }

    // get icon
    const detailedIcon = icons[0];

    // change type to "brands" if icon contains a brand
    if(detailedIcon.types.includes('brands')){
      type = 'brands';
    }

    // return icon
    return {
      name: detailedIcon.name,
      className: this.createIconClassName(detailedIcon.name, type, weight),
    };

  }

  getAnimations(): FlatIconAnimation[] {
    return FLAT_ICON_ANIMATIONS.map(i => ({
      name: i,
      className: `fi-animation-${i}`,
    }));
  }

  getAnimation(name: FlatIconAnimationType|string): FlatIconAnimation|null {
    return this.getAnimations().find(a => a.name === name) || null;
  }

}
