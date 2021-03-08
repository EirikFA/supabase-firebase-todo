const updateArrayEl = <T, K extends keyof T>(
  array: T[],
  property: K,
  identifier: T[K],
  newItem: Partial<T>
): T[] => {
  const newItems = array.slice();
  const i = newItems.findIndex(item => item[property] === identifier);
  if (i < 0) return array;

  newItems[i] = {
    ...newItems[i],
    ...newItem
  };

  return newItems;
};

export default updateArrayEl;
