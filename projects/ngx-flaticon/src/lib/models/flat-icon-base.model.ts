import {Directive, ElementRef, inject, OnChanges, OnDestroy, OnInit} from "@angular/core";
import {getTailwindService, TailwindService} from "@ethalium/ng-tailwind-color";
import {BehaviorSubject, debounceTime, Subject, takeUntil} from "rxjs";
import {FlatIconService, getFlatIcon} from "../services/flat-icon.service";
import {FlatIconItem} from "../interfaces/flat-icon.interface";
import {FlatIconBaseData} from "../interfaces/flat-icon-data.interface";

@Directive()
export class FlatIconBase implements OnInit, OnChanges, OnDestroy {

  /**
   * A Subject that represents a stream of changes.
   * Emits a notification whenever a change event occurs.
   * Typically used for notifying subscribers about updates or changes
   * in the state or values associated with a particular logic or component.
   */
  private changes$: Subject<void> = new Subject<void>();
  private changesDebounced$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

  /**
   * A Subject used to manage the lifecycle of subscriptions in a component or service.
   * Emitting a value on this Subject typically triggers the completion of associated subscriptions,
   * effectively allowing cleanup of resources and prevention of memory leaks.
   *
   * It is commonly used in conjunction with the `takeUntil` operator from RxJS in Angular or similar frameworks.
   *
   * @type {Subject<void>}
   */
  protected destroy$: Subject<void> = new Subject<void>();

  /**
   * Represents a reference to a native DOM element.
   * Provides a way to interact directly with the underlying HTMLElement.
   * Useful for manipulating DOM properties, applying styles, or accessing native methods.
   *
   * Note: Accessing and manipulating the DOM directly should generally
   * be avoided when using frameworks that promote declarative programming.
   *
   * @type {ElementRef<HTMLElement>}
   */
  private elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  /**
   * Represents the instance of the FlatIconService used for handling functionality
   * related to flat icons. This service is either injected as an optional dependency
   * or initialized using the `getFlatIcon` fallback function if not present.
   *
   * The FlatIconService might include operations such as retrieving, managing, or
   * manipulating flat icon resources within the application.
   *
   * Note: The injection is optional, and if the service is not available,
   * the fallback mechanism will ensure functionality remains intact.
   */
  private fiService: FlatIconService = inject(FlatIconService, { optional: true }) || getFlatIcon();
  private twService: TailwindService = inject(TailwindService, { optional: true }) || getTailwindService();

  /**
   * Represents the optional data for a flat icon element.
   *
   * This variable can hold either a `FlatIconBaseData` object
   * representing the base data of a flat icon element or `null` if
   * no data is provided.
   *
   * It is optional and may not always be present.
   */
  private elementData?: FlatIconBaseData|null;
  private elementClasses: string[] = [];
  private elementStyles: Record<string, any> = {};
  private elementVariables: Record<string, any> = {};

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   * This method listens for changes and debounced changes in observable streams and performs corresponding actions.
   *
   * @return {void} No return value.
   */
  ngOnInit() {

    // listen to changes$
    this.changes$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.onUpdate();
    });

    // listen to debounced changes
    this.changesDebounced$.pipe(debounceTime(0), takeUntil(this.destroy$)).subscribe(() => this.changes$.next());

  }

  /**
   * Handles Angular lifecycle hook for detecting changes to input properties of the component.
   * This method is invoked whenever the component's input-bound properties are updated.
   * Typically used to react to changes and handle any logic required when these updates occur.
   *
   * @return {void} Does not return any value.
   */
  ngOnChanges() {
    this.changesDebounced$.next();
  }

  /**
   * Method invoked to handle updates or changes.
   * This function performs operations or processes triggered by an update event.
   *
   * @return {void} Does not return a value.
   */
  onUpdate(): void {}

  /**
   * Updates the data of the icon based on the provided information. Skips updating if the data is identical to the current data or if the icon is not found.
   *
   * @param {FlatIconBaseData} data - The new icon data containing properties such as name, family, and style.
   * @return {boolean} Returns true if the data was updated successfully, or false if the update was skipped.
   */
  updateData(data: FlatIconBaseData): boolean {

    // skip if icon is the same
    if(this.elementData && JSON.stringify(this.elementData) === JSON.stringify(data)){
      return false;
    }

    // set default data
    data.family = data.family || this.fiService.data.options.defaultFamily;
    data.weight = data.weight || this.fiService.data.options.defaultWeight;

    // find icon
    const icon = this.fiService.findOne(data.name, {
      family: data.family,
      weight: data.weight,
    });

    // skip if icon was not found
    if(!icon){
      return false;
    }

    // set data
    this.buildVariables(icon, data);
    this.buildClasses(icon, data);
    this.buildStyles(icon, data);

    // set current data
    this.elementData = data;
    return true;

  }

  /**
   * Builds and sets CSS custom properties for the given icon element based on the provided data.
   * This method updates color and opacity variables for duotone style icons
   * and applies them as inline styles to the associated DOM element.
   *
   * @param {FlatIconItem} icon - The target icon for which variables are being set.
   * @param {FlatIconBaseData} data - The data object containing style, color, and opacity information for the icon.
   * @return {void} This method does not return a value.
   */
  private buildVariables(icon: FlatIconItem, data: FlatIconBaseData): void {

    // remove variables
    Object.keys(this.elementVariables).map(_ => this.element.style.removeProperty(_));

    // skip if icon is not duotone
    if(data.weight !== 'duotone'){
      return;
    }

    // define colors
    const primaryColor = data.primaryColor ? this.twService.resolve(data.primaryColor)?.toString('rgb') : null;
    const secondaryColor = data.secondaryColor ? this.twService.resolve(data.secondaryColor)?.toString('rgb') || primaryColor : null;

    // set primary color
    if(primaryColor){
      this.elementVariables['--fi-primary-color'] = primaryColor;
    }

    // set secondary color
    if(secondaryColor){
      this.elementVariables['--fi-secondary-color'] = secondaryColor;
    }

    // set primary opacity
    if(data.primaryOpacity){
      this.elementVariables['--fi-primary-opacity'] = data.primaryOpacity;
    }

    // set secondary opacity
    if(data.secondaryOpacity){
      this.elementVariables['--fi-secondary-opacity'] = data.secondaryOpacity;
    }

    // set variables
    Object.entries(this.elementVariables).map(([key, value]) => this.element.style.setProperty(key, value));

  }

  /**
   * Constructs and manages the CSS classes for the element based on the provided icon and data.
   *
   * @param {FlatIconItem} icon - The icon object containing the class name and other attributes.
   * @param {FlatIconBaseData} data - The base data associated with the FlatIcon configuration.
   * @return {void} This method does not return any value.
   */
  private buildClasses(icon: FlatIconItem, data: FlatIconBaseData): void {

    // remove classes
    this.elementClasses.map(_ => this.element.classList.remove(_));

    // set classes
    this.elementClasses.push('fi-icon');
    this.elementClasses.push('fi', icon.className);

    // add classes
    this.elementClasses.map(_ => this.element.classList.add(_));

  }

  /**
   * Builds and applies styles to the element based on the provided icon and data.
   *
   * @param {FlatIconItem} icon - The icon object that contains details about the flat icon.
   * @param {FlatIconBaseData} data - The base data object that provides style-related information.
   * @return {void} This method does not return any value.
   */
  private buildStyles(icon: FlatIconItem, data: FlatIconBaseData): void {

    // remove styles
    Object.keys(this.elementStyles).map(_ => this.element.style.removeProperty(_));

    // add color
    if(data.weight != 'duotone'){
      if(this.twService.resolve(data.primaryColor)){
        this.elementStyles['color'] = `${this.twService.resolve(data.primaryColor)?.toString('rgb')}`;
      }
    }

    // set styles
    Object.entries(this.elementStyles).map(([key, value]) => this.element.style.setProperty(key, value));

  }

  /**
   * Retrieves the native HTML element associated with the element reference.
   *
   * @return {HTMLElement} The native HTML element.
   */
  get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  /**
   * Lifecycle hook that is called when the directive or component is destroyed.
   * It ensures that any subscriptions or resources are properly cleaned up
   * by signaling completion to the destroy$ observable.
   *
   * @return {void} No return value.
   */
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$ = null as any;
  }

}
