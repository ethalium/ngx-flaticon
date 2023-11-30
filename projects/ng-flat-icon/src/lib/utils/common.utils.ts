export function flatten(items: any[]): any[] {
  const result: any[] = [];
  if(!Array.isArray(items)){
    result.push(items);
    return result;
  }
  for(let item of items){
    result.push(...flatten(item));
  }
  return result;
}
