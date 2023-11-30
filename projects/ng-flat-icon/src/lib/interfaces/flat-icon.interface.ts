export type FlatIconType = 'rounded'|'straight'|'brands';
export type FlatIconWeight = 'regular'|'bold'|'solid';

export type FlatIcons = { [key: string]: FlatIconDetailed }
export interface FlatIconDetailed extends FlatIcon {
  types: FlatIconType[];
  weights: FlatIconWeight[];
}

export interface FlatIcon {
  name: string;
  className: string;
}

export type FlatIconAnimationType = 'beat'|'bounce'|'fade'|'beat-fade'|'flip'|'shake'|'spin'|'spin-reverse'|'pulse'|'spin-pulse';
export interface FlatIconAnimation {
  name: FlatIconAnimationType;
  className: string;
}
