import {FlatIconFamily, FlatIconWeight} from "./flat-icon-types.interface";
import {TWColor} from "@ethalium/ngx-tailwind-color";

export interface FlatIconBaseData {
  name: string;
  family?: FlatIconFamily|null;
  weight?: FlatIconWeight|null;
  primaryColor?: TWColor|null;
  primaryOpacity?: number|null;
  secondaryColor?: TWColor|null;
  secondaryOpacity?: number|null;
}
