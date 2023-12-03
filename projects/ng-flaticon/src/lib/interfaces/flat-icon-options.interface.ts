import {FlatIconAnimationType, FlatIconType, FlatIconWeight} from "./flat-icon.interface";

export interface FlatIconOptions {

  /**
   * Sets the default type of the icon
   * @default "rounded"
   *
   */
  defaultType: FlatIconType;

  /**
   * Sets the default weight if no weight is defined by the directive
   * @default "regular"
   *
   */
  defaultWeight: FlatIconWeight;

}

export interface FlatIconFindOptions {
  search: string|null;
  types: FlatIconType[];
  weights: FlatIconWeight[];
  limit: number;
}

export interface FlatIconFindOneOptions {
  type: FlatIconType|null;
  weight: FlatIconWeight|null;
}

export interface FlatIconFindOneClassOptions extends FlatIconFindOneOptions {
  animation: FlatIconAnimationType|null;
}
