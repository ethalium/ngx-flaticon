import {FlatIconOptions} from "../interfaces/flat-icon-options.interface";
import {FlatIcon, FlatIcons} from "../interfaces/flat-icon-types.interface";
import {FLAT_ICONS} from "../data/flat-icon.data";

export class FlatIconDataService {
  private _icons!: FlatIcons;
  private _iconValues!: FlatIcon[];
  private _iconKeys!: string[];
  private _options!: FlatIconOptions;

  constructor(
    private opts?: Partial<FlatIconOptions>,
  ){}

  /**
   * Retrieves the current configuration options for FlatIcon.
   * If options are not already set, it initializes them with default values.
   *
   * @return {FlatIconOptions} The configuration options for FlatIcon, including default type and weight.
   */
  get options(): FlatIconOptions {
    if(!this._options){
      this._options = {
        defaultFamily: this.opts?.defaultFamily || 'rounded',
        defaultWeight: this.opts?.defaultWeight || 'regular',
      };
    }
    return this._options;
  }

  /**
   * Retrieves a collection of icons categorized by their types and weights.
   * The method processes an external data source (FLAT_ICONS) to dynamically
   * generate an object that maps icon names to their metadata, including types
   * and weights.
   *
   * @return {FlatIcons} An object containing icon metadata, where keys are
   * lowercase icon names and values describe the icon's name, types, and weights.
   */
  get icons(): FlatIcons {
    if(!this._icons){
      this._icons = FLAT_ICONS;
    }
    return this._icons;
  }

  /**
   * Retrieves the keys of the icons object and caches them for future access.
   *
   * @return {string[]} An array of keys representing the icons.
   */
  get iconKeys(): string[] {
    if(!this._iconKeys){
      this._iconKeys = Object.keys(this.icons);
    }
    return this._iconKeys;
  }

  /**
   * Retrieves the list of flat icons derived from the `icons` object.
   * If the icon values are not already computed, they are initialized by extracting the values of the `icons` object.
   *
   * @return {FlatIcon[]} An array of FlatIcon objects representing the icon values.
   */
  get iconValues(): FlatIcon[] {
    if(!this._iconValues){
      this._iconValues = Object.values(this.icons);
    }
    return this._iconValues;
  }

}
