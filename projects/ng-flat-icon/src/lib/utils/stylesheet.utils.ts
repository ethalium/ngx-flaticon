import {flatten} from "./common.utils";

const options = {
  selectors: [] as string[],
  lastUpdate: 0 as number,
};

export function getAllStyleSelectors(): string[] {
  if(options.selectors.length && options.lastUpdate > Date.now()){
    return options.selectors;
  }
  options.selectors = [];
  if(document?.styleSheets){
    const styleSheets = flatten(Array.from(document.styleSheets).filter(s => {
      try {
        return s.cssRules && s.cssRules.length;
      }catch{
        return false;
      }
    }).map(s => Array.from(s.cssRules)));
    styleSheets.map((rule: any) => {
      if(rule.selectorText){
        options.selectors.push(rule.selectorText);
      }
    });
  }
  options.lastUpdate = Date.now() + (1000 * 10);
  return options.selectors;
}

export function styleSelectorExists(...selectorList: any[]): boolean {
  const selectors = selectorList.filter(s => typeof s === 'string' && !!s).map(s => s.trim().toLowerCase());
  const selectorsAll = getAllStyleSelectors().map(s => s.trim().toLowerCase());
  for(let selector of selectors){
    if(!selectorsAll.filter(s => s.indexOf(selector)).length){
      return false;
    }
  }
  return true;
}
