import {FlatIcon} from "./flat-icon-types.interface";

export interface FlatIconItem extends Omit<FlatIcon, 'classes'> {
  className: string;
}
