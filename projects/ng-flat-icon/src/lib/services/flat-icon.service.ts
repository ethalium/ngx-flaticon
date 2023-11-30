import {Inject, inject, Injectable, Optional} from "@angular/core";
import {FLAT_ICON_OPTIONS} from "../flat-icon.constant";
import {FlatIconFindOneOptions, FlatIconFindOptions, FlatIconOptions} from "../interfaces/flat-icon-options.interface";
import {
  FlatIcon,
  FlatIconAnimation,
  FlatIconAnimationType,
  FlatIconDetailed,
  FlatIcons, FlatIconType, FlatIconWeight
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
      this._icons = {};
      Object.entries(FLAT_ICONS).map(([type, weights]) => {
        Object.entries(weights).map(([weight, name]) => {
          const key = (name as string).trim().toLowerCase();
          if(!this._icons[key]) {
            this._icons[key] = {
              name: name,
              className: this.createIconClassName(name, this.options.defaultType, this.options.defaultWeight),
              types: [],
              weights: []
            };
          }
          const icon = this._icons[key] as FlatIconDetailed;
          if(!icon.types.includes(type as any)) icon.weights.push(type as any);
          if(!icon.weights.includes(weight as any)) icon.weights.push(weight as any);
        });
      });
    }
    return this._icons;
  }

  private createIconClassName(name: string, type: FlatIconType, weight: FlatIconWeight): string {
    const types = { 'rounded': 'r', 'straight': 's' };
    const weights = { 'regular': 'r', 'bold': 'b', 'solid': 's' };
    if(type === 'brands'){
      return `fi-brands`;
    }
    return `fi-${weights[weight]}${types[type]}-${name}`;
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
    const iconKeys = Object.keys(this.icons).filter(name => !opts.search || name.trim().toLowerCase().indexOf(opts.search.trim().toLowerCase()));

    // find icons
    for(let key of iconKeys){
      const icon = this.icons[key];
      if(opts.limit > 0 && icons.length >= opts.limit) break;
      if(opts.search && icon.name.trim().toLowerCase().indexOf(opts.search.trim().toLowerCase().toString()) === -1) continue;
      if(opts.types.length > 0 && !opts.types.filter(t => icon.types.includes(t)).length) continue;
      if(opts.weights.length > 0 && !opts.weights.filter(w => icon.weights.includes(w)).length) continue;
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
      types: [type, 'brands'],
      weights: [weight],
      limit: 1,
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
