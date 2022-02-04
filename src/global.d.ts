interface Array<T> {
  /**
   * Returns the index of the last element in the array where predicate is true, and -1 otherwise.
   * @param predicate find calls predicate once for each element of the array, in descending
   * order, until it finds one where predicate returns true. If such an element is found,
   * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
   * @param thisArg If provided, it will be used as the this value for each invocation of
   * predicate. If it is not provided, undefined is used instead.
   */
  findLastIndex(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): number;
}
