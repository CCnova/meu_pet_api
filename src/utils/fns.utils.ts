export function filterInstancesOf<SearchType>(
  values: Array<any>,
  T: SearchType
): SearchType[] {
  return values.filter((value) => typeof value === typeof T);
}
