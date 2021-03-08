const deleteArrayEl = <T, K extends keyof T>(
  array: T[],
  property: K,
  identifier: T[K]
): T[] => {
  const newItems = array.slice();
  const i = newItems.findIndex(item => item[property] === identifier);
  if (i < 0) return array;

  newItems.splice(i, 1);

  return newItems;
};

export default deleteArrayEl;
