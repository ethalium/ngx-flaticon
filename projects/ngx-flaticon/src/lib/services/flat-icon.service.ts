import {Inject, Injectable, Optional} from "@angular/core";
import {FLAT_ICON_OPTIONS} from "../flat-icon.constant";
import {FlatIconFindOneOptions, FlatIconFindOptions, FlatIconOptions} from "../interfaces/flat-icon-options.interface";
import {FlatIconDataService} from "./flat-icon-data.service";
import {FlatIconItem} from "../interfaces/flat-icon.interface";
import {FlatIcon} from "../interfaces/flat-icon-types.interface";

/**
 * Retrieves an instance of the FlatIconService.
 *
 * @param {Partial<FlatIconOptions>} [options] - Optional configuration options for creating the FlatIconService instance.
 * @return {FlatIconService} A new instance of the FlatIconService.
 */
export function getFlatIcon(options?: Partial<FlatIconOptions>) {
  return new FlatIconService(options);
}

/**
 * FlatIconService is an Angular service that provides utilities for managing and retrieving flat icons.
 * It supports configuring default types and weights for icons and has methods for finding icons and animations.
 * The service is designed to be provided globally using Angular's dependency injection system.
 */
@Injectable({ providedIn: 'root' })
export class FlatIconService {
  public readonly data!: FlatIconDataService;

  /**
   * Constructs an instance of the class.
   *
   * @param options
   */
  constructor(@Optional() @Inject(FLAT_ICON_OPTIONS) options?: Partial<FlatIconOptions>) {
    this.data = new FlatIconDataService(options);
  }

  /**
   * Finds and retrieves a list of FlatIcon items based on the provided options.
   *
   * @param {Partial<FlatIconFindOptions>} [options] - An optional object that specifies search criteria for finding FlatIcon items. The options may include:
   *    - `search`: A string to search for matching icon keys.
   *    - `families`: An array of families to filter icons.
   *    - `styles`: An array of styles to filter icons.
   *    - `limit`: A number specifying the maximum number of results to return.
   * @return {FlatIconItem[]} An array of FlatIcon items that match the specified options.
   */
  find(options?: Partial<FlatIconFindOptions>): FlatIconItem[] {

    // create options
    const opts: FlatIconFindOptions = {
      search: options?.search && typeof options?.search === 'string' ? options.search.trim().toLowerCase() || null : null,
      families: (Array.isArray(options?.families) ? options?.families || [] : []),
      weights: Array.isArray(options?.weights) ? options?.weights || [] : [],
      limit: options?.limit && typeof options?.limit === 'number' && options?.limit >= 0 ? options?.limit || 0 : 0,
    };

    // create array for matches
    const matches: FlatIcon[] = [];
    const exactMatches: FlatIcon[] = [];
    const relativeMatches: FlatIcon[] = [];

    // process exact and relative matches by name and tags
    if(opts.search){
      for(let i = 0; i < this.data.iconValues.length; i++){

        // get icon
        const icon = this.data.iconValues[i];

        // convert items to lowercase
        const nameLower = icon.name.trim().toLowerCase();
        const tagsLower = icon.tags.map(t => t.trim().toLowerCase());

        // search for exact and relative match in name and tags
        const isExact = opts.search && nameLower === opts.search;
        const isRelative = opts.search && !isExact && (tagsLower.includes(opts.search) || nameLower.includes(opts.search));

        // add matches
        if(isExact || isRelative || !opts.search){
          isExact ? exactMatches.push(icon) : relativeMatches.push(icon);
        }

        // break if exact matches are greater or equal the icon
        if(opts.limit > 0 && exactMatches.length >= opts.limit){
          break;
        }

      }
    }

    // add all icons if no search is defined
    if(opts.search){
      matches.push(...exactMatches, ...relativeMatches);
    }else{
      matches.push(...this.data.iconValues);
    }

    // create array for final items
    const items: FlatIconItem[] = [];

    // process matches
    for(let i = 0; i < matches.length; i++){

      // get icon
      const icon = matches[i];

      // search for items
      for(let fontName of Object.keys(icon.classes)){

        // check if fontName is brands and is part of search
        if(fontName === 'brands' && opts.families.includes('brands')){
          items.push({
            name: icon.name,
            description: icon.description,
            tags: icon.tags,
            className: icon.classes[fontName] as any,
          });
          continue;
        }

        // split fontName into style and family
        const [style, family] = fontName.split("-") as [any, any];

        // style/family match
        let match: boolean = true;
        if (opts.weights.length && opts.families.length) {
          match = opts.weights.includes(style) && opts.families.includes(family);
        } else if (opts.weights.length) {
          match = opts.weights.includes(style);
        } else if (opts.families.length) {
          match = opts.families.includes(family);
        }

        // skip if not matching
        if(!match){
          continue;
        }

        // add item to array
        items.push({
          name: icon.name,
          description: icon.description,
          tags: icon.tags,
          className: (icon.classes as any)[fontName],
        });

      }

      // break loop if limit is reached
      if(opts.limit > 0 && matches.length >= opts.limit){
        break;
      }

    }

    // return matches
    return opts.limit > 0 ? items.slice(0, opts.limit) : items;

  }

  /**
   * Finds and retrieves a single icon based on the provided name and options.
   *
   * @param {string} name - The name of the icon to search for.
   * @param {Partial<FlatIconFindOneOptions>} [options] - An optional object to specify search options,
   *   including type and weight of the icon. Defaults to the default type and weight if not provided.
   * @return {FlatIcon|null} - Returns a `FlatIcon` object containing the icon name and className
   *   if a matching icon is found, or `null` if no match is found.
   */
  findOne(name: string, options?: Partial<FlatIconFindOneOptions>): FlatIconItem|null {

    // format options
    let [family, weight] = [
      options?.family || this.data.options.defaultFamily,
      options?.weight || this.data.options.defaultWeight
    ];

    // find icons
    const icons = this.find({
      search: name,
      families: [family, 'brands'],
      weights: [weight],
      limit: 1,
    });

    // return icon
    return icons.length ? icons[0] : null;

  }

}
