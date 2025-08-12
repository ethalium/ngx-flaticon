import {FlatIconFamily, FlatIconWeight} from "./flat-icon-types.interface";

/**
 * Represents configuration options for FlatIcon component behavior and styling.
 */
export interface FlatIconOptions {

  /**
   * Represents the default icon family used for rendering icons.
   *
   * The `defaultFamily` variable specifies the standard icon family to be applied
   * throughout the application wherever an icon is required. It ensures consistency
   * in the icon's visual appearance by adhering to a unified design language or style.
   *
   * This variable is of type `FlatIconFamily` which encapsulates the details about
   * the specific family of icons being utilized.
   *
   * @default "rounded"
   */
  defaultFamily: FlatIconFamily;

  /**
   * Represents the default styling configuration for flat icons.
   * Defines the visual appearance attributes such as colors, sizes,
   * and other style-specific properties used for rendering flat icons
   * across the application.
   *
   * This variable serves as a baseline style that can be overridden
   * or extended by other style configurations when necessary.
   *
   * @default "regular"
   */
  defaultWeight: FlatIconWeight;

}

/**
 * Represents options for finding icons in the FlatIcon library.
 *
 * @interface FlatIconFindOptions
 *
 * @property {string|null} search
 * A search term used to filter icons. Can be a string or null for no search filter.
 *
 * @property {FlatIconFamily[]} families
 * An array of icon family names to restrict the search results.
 *
 * @property {FlatIconWeight[]} weights
 * An array of icon styles to restrict the search results, e.g., flat, line, filled.
 *
 * @property {number} limit
 * The maximum number of results to return.
 */
export interface FlatIconFindOptions {
  search: string|null;
  families: FlatIconFamily[];
  weights: FlatIconWeight[];
  limit: number;
}

/**
 * Interface representing options for finding a single FlatIcon.
 *
 * This interface is used to provide filters or criteria when searching for
 * a specific FlatIcon within a collection or database.
 */
export interface FlatIconFindOneOptions {
  family: FlatIconFamily|null;
  weight: FlatIconWeight|null;
}
