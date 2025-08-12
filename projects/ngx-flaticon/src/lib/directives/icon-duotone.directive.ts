import {Directive, Input, OnChanges, OnInit} from "@angular/core";
import {FlatIconBase} from "../models/flat-icon-base.model";
import {TWColor} from "@ethalium/ngx-tailwind-color";
import {FlatIconFamily, FlatIconWeight} from "../interfaces/flat-icon-types.interface";

@Directive({
  selector: 'fi-duo-icon, [fi-duo-icon], fi-duo, [fi-duo]',
  standalone: true,
})
export class FlatIconDuotoneDirective extends FlatIconBase implements OnInit, OnChanges {

  /**
   * Represents the name of an entity.
   * This is a required property and must be a string.
   */
  @Input({ required: true }) name!: string;
  @Input() color?: TWColor|null;
  @Input() primaryColor?: TWColor|null;
  @Input() primaryOpacity?: number|null;
  @Input() secondaryColor?: TWColor|null;
  @Input() secondaryOpacity?: number|null;
  @Input() family?: FlatIconFamily|null;

  /**
   * Executes the update process for the current object by updating its internal data properties.
   *
   * @return {void} Does not return any value.
   */
  override onUpdate() {
    this.updateData({
      name: this.name,
      family: this.family,
      weight: 'duotone',
      primaryColor: this.primaryColor || this.color,
      secondaryColor: this.secondaryColor,
      primaryOpacity: this.primaryOpacity,
      secondaryOpacity: this.secondaryOpacity,
    });
  }

}
